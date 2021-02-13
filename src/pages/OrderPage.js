import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Redirect, Link } from "react-router-dom";

import { initOrderPageTriggered } from "../redux/actions/initOrderPage";
import { sendCommentsSubmitted } from "../redux/actions/sendComments";
import { checkPromocodeSubmitted } from "../redux/actions/checkPromocodeLogin";
import { sendLocationTriggered } from "../redux/actions/sendLocation";
import { clearImages } from "../redux/actions/initOrderImages";

import HeaderFooter from "../components/HeaderFooter/HeaderFooter";
import Preloader from "../componentsDumb/Preloader/Preloader";
import Button from "../components/Button/Button";
import Modal from "../components/BookLikeFlipper/Modal";
import SelectList from "../components/Select/SelectList";

import cancel from "../img/cancel-icon.png";
import accept from "../img/accept-icon.png";
import Logo from "../img/mem.jpeg";

import "./styles/OrderPage.css";

class OrderPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      confirmed: "",
      denied: "",
      selectedAlbum: null,
      isConfirmed: "",
      customerC: true,
      added: true,
      totalPrice: 0,
      totalArray: []
    };

    this.Increment = this.Increment.bind(this);
    this.Decrement = this.Decrement.bind(this);
    this.onClick = this.onClick.bind(this);
    this.routeChange = this.routeChange.bind(this);
    this.formRef = React.createRef();
  }

  componentDidMount() {
    window.history.state.state = {};
    this.props.initOrderPageTriggered(
      localStorage.getItem("locale") || undefined
    );
    this.props.sendLocationTriggered();
    if (
      this.props.albums === undefined &&
      sessionStorage.getItem("isAuthorized") === "true"
    ) {
      return this.props.checkPromocodeSubmitted(
        sessionStorage.getItem("password")
      );
    }
  }

  componentWillUnmount() {
    this.props.checkPromocodeSubmitted(this.props.promocode);
    this.props.clearImages();
  }
  routeChange() {
    let path = `/who_we_are`;
    this.props.history.push(path);
  }
  showModal = albumID => {
    this.setState({ show: true, selectedAlbum: albumID });
  };

  hideModal = () => {
    this.setState({ show: false });
  };
  // sessionStorage.getItem("password")
  sendData = () => {
    let res = {};
    res.albums_info = this.props.albums.map(item => {
      return {
        album_id: item.id,
        //feedback: this.state[`${item.id}Comment`],
        count: this.state[`${item.id}Count`],
        promocode: sessionStorage.getItem("password")
      };
    });
    res.promocode = sessionStorage.getItem("password");
    res.is_confirmed = this.state.isConfirmed;
    res.comments = this.state.totalArray;

    this.props.sendCommentsSubmitted(res);
    if (this.state.isConfirmed == "confirmed") {
      this.props.history.push("/thank_you_page");
    } else if (this.state.isConfirmed == "denied") {
      this.props.history.push("/");
    }
  };

  onClick = e => {
    e.preventDefault();
    this.setState({
      isConfirmed: e.target.value
    });
    this.formRef.current.submit();
    //создание реф формы (линк на форму) и запуск её метода submit
  };

  onChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  //КАК ЭТО У
  Increment = (e, itemName, totalPrice, price) => {
    e.preventDefault();
    this.setState(
      {
        [`${itemName}`]: this.state[itemName] + 1
      },
      () => {
        this.setState({
          [`${totalPrice}`]: price * this.state[itemName]
        });
      }
    );
  };

  Decrement = (e, itemName, totalPrice, price) => {
    e.preventDefault();
    if (this.state[itemName] >= 1) {
      this.setState({
        [`${itemName}`]: this.state[itemName] - 1,
        [`${totalPrice}`]: this.state[totalPrice] - price
      });
    }
  };

  addNewElem = comment => {
    this.setState({ totalArray: [...this.state.totalArray, comment] });
  };

  render() {
    const {
      isLoading,
      data,
      albums,
      headerFooterData,
      customerType,
      feedbackData,
      promocodeLoading
    } = this.props;
    if (!this.props.imgs || this.props.imgs.length < 3) {
      return <Preloader />;
    } else if (promocodeLoading || isLoading || albums === undefined) {
      return <Preloader />;
    }
    if (
      albums &&
      !this.state[`${albums[0].id}Count`] &&
      !this.state[`${albums[1].id}Count`] &&
      !this.state[`${albums[2].id}Count`]
    ) {
      let albumsName = {};
      albums.map(item => {
        albumsName = {
          ...albumsName,
          [`${item.id}Count`]: 0,
          [`${item.id}Comment`]: "",
          [`${item.id}TotalPrice`]: 0
        };
      });
      this.state = {
        ...this.state,
        ...albumsName
      };
    }
    let numberOfUsed = [
      this.state[`${albums[0].id}Count`],
      this.state[`${albums[1].id}Count`],
      this.state[`${albums[2].id}Count`]
    ];
    let albumsToLink = [
      this.props.imgs[Object.keys(this.props.imgs)[0]],
      this.props.imgs[Object.keys(this.props.imgs)[1]],
      this.props.imgs[Object.keys(this.props.imgs)[2]]
    ];
    let photoCovers = {};
    photoCovers = this.props.imgs || photoCovers;

    if (this.state.isConfirmed) {
      this.sendData();
    }

    let albumsId = albums.map(i => {
      return i.id;
    });
    let capitanPrice = 0;

    albumsId.map(id => {
      capitanPrice += this.state[`${id}TotalPrice`];
    });

    return (
      <div className="order-page">
        {" "}
        <HeaderFooter
          buttonText={headerFooterData.header_button_text}
          faq={headerFooterData.faq}
          albumExamples={headerFooterData.album_examples}
          gift_cards={headerFooterData.gift_cards}
          who_we_are={headerFooterData.who_we_are}
          forDesigner={headerFooterData.for_designer}
          className="header-memoriestor"
        >
          <Link to={`/`}>
            <img src={Logo} className="header-logo" alt="memoriestore" />
          </Link>
        </HeaderFooter>
        {customerType == "customer" ? (
          <form className="form" onSubmit={this.onSubmit}>
            <h1>{data.header}</h1>
            <div className="subtext-wrapper">
              <p className="albums-to-buy">
                {/* !האלבומים שלך כמעט מוכנים,  */}
                {data.name_text}
                <span className="customer-name-bold">
                  {this.props.customerName}
                </span>
                <br />
                {/* ? מה לשלוח להדפסה */}
                {data.albums_to_buy}
              </p>
              <p className="discount" dir="rtl">
                <span>{data.discount_text}</span>&nbsp;
              </p>
            </div>
            <div className="container-for-three-albums">
              {albums.map((item, key) => {
                let cover = photoCovers[item.id]; //
                if (!cover) {
                  return null;
                }
                cover = cover.find(el => el.is_main);
                let count = albums.indexOf(item) + 1;

                let pic = cover.pic.split("/").slice(2);
                let pagesArray = [];
                return (
                  <div key={item.id} className="album">
                    <div className="album-container">
                      <div className="top-side-container">
                        <p />
                        {/* <p>{item.name}</p> */}
                        {/* <p>{data.pages}</p> */}
                        {/* <p>{data.pages}</p> http://memoriestore.com/static/media/*/}

                        <img
                          src={`https://memoriestore.com/static${cover.pic ||
                            "dd"}`}
                          onClick={() => this.showModal(item.id)}
                          alt="memoriestore"
                        />
                      </div>
                      <div className="bottom-side-container">
                        {/* {`http://memoriestore.com/static${
                          item.designer_avatar
                        }`} */}
                        {/* <Link
                          to={{
                            pathname: `/designer_portfolio_page/${
                              item.designer_id
                            }`,
                            state: {
                              designerAvatar: `http://memoriestore.com/static${
                                item.designer_avatar
                              }`,
                              designerName: item.designer_name,
                              designerCountry: item.designer_country,
                              designerCover1: `http://memoriestore.com/static${
                                cover.pic
                              }`,
                              designerAlbum: this.props.imgs[item.id],
                              yuuy: ["a", "b", "c"]
                            }
                          }}
                        >
                          <img
                            src={`http://memoriestore.com/static${
                              item.designer_avatar
                            }`}
                          />
                        </Link> */}
                        {/* <div className="info-wrapper">
                          <div className="left-side">
                            <p>
                              <p>Designed by:</p>
                              {item.designer_name}
                            </p>
                            <p>{item.designer_country}</p>
                          </div>
                          <div className="right-side">
                            <p className="flex-p">
                              <span>עמודים</span>
                              <span>&nbsp; {item.pages}</span>
                            </p>
                            <p className="flex-p">
                              <span>ש''ח</span> */}
                        {/* {item.pages * 2 - 2 <= 30 ? (
                                <span>&nbsp;{item.pages * 2 * 10}</span>
                              ) : (
                                <span>
                                  &nbsp;{(item.pages * 2 - 30) * 5 + 299}
                                </span>
                              )} */}
                        {/* <span>{item.price}</span>
                            </p>
                          </div>
                        </div> */}
                        <div className="info-order">
                          <span>
                            {count} {data.count_text}
                          </span>
                          <span>
                            {item.price} {data.price_text}
                          </span>
                          <span>
                            {item.pages} {data.pages_text}
                          </span>
                        </div>
                        {item.used_pages ? (
                          <span className="order-used-pages">
                            {item.used_pages}:{data.used_pages}
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <div className="mark-container">
                      <div className="top-side">
                        <button
                          onClick={e => {
                            this.Decrement(
                              e,
                              `${item.id}Count`,
                              `${item.id}TotalPrice`,
                              item.price
                            );
                          }}
                        >
                          -
                        </button>
                        <input
                          disabled
                          type="number"
                          onChange={this.onChange}
                          value={this.state[`${item.id}Count`]}
                          name={`${item.id}Count`}
                          // defaultValue={0}
                        />
                        <button
                          onClick={e => {
                            this.Increment(
                              e,
                              `${item.id}Count`,
                              `${item.id}TotalPrice`,
                              item.price
                            );
                          }}
                        >
                          +
                        </button>
                        {/* <p className="total-for-album">
                          {`${data.total_price}`}
                          {this.state[`${item.id}TotalPrice`]}
                        </p> */}
                      </div>
                      {/* <p>{data.more_book_text}</p> */}
                      <div className="bottom-side">
                        {/* <textarea
                          name={`${item.id}Comment`}
                          onChange={this.onChange}
                          placeholder={`${data.feedback_placeholder}`}
                          value={this.state[item.id]}
                          dir="rtl"
                        /> */}
                        {/* <p className="comment-header">{data.comments_header}</p> */}
                        <div className="leave-a-comment">
                          <SelectList
                            pagesText={data.pages}
                            placeholder={data.feedback_placeholder}
                            addNewElem={this.addNewElem}
                            key={key}
                            selectArray={this.props.feedbackOptions}
                            pagesArray={item.pages}
                            addButton={data.add_button}
                          />
                        </div>
                      </div>
                    </div>
                    {this.state.show && this.state.selectedAlbum === item.id ? (
                      <Modal
                        selectedAlbum={
                          this.props.imgs[this.state.selectedAlbum]
                        }
                        show={this.state.show}
                        handleClose={this.hideModal}
                        albumNum={this.state.selectedAlbum}
                        isReverse={item.from_right_to_left}
                      />
                    ) : null}
                  </div>
                );
              })}
            </div>

            <div className="to-pay">
              {/* <div className="to-pay-price">
                {data.to_pay} <p> {`${capitanPrice} ${data.price_text}`}</p>
              </div> */}
              {/* <div className="row social-media-logos">
                <form
                  ref={this.formRef}
                  name="pelepayform"
                  target="_blank"
                  action="https://www.pelepay.co.il/pay/paypage.aspx"
                  method="post"
                >
                  <input
                    type="hidden"
                    value="finance@memoriestore.com"
                    name="business"
                  />
                  <input
                    type="hidden"
                    value={`${capitanPrice}.00`}
                    name="amount"
                  />
                  <input type="hidden" value="54" name="orderid" />
                  <input
                    type="hidden"
                    value="hello from mem"
                    name="description"
                  />
                  <input type="hidden" value="10" name="max_payments" />
                </form>
              </div> */}
            </div>
            {/* numberOfUsed проверять на нули */}
            <div className="link-to-confirm-container">
              {numberOfUsed.filter(number => number !== 0).length === 0 ? (
                <p
                  className="link-to-confirm disabled-link"
                  title="Select at least one album"
                >
                  {data.toConfirm || "TO CONFIRMATION PAGE"}
                </p>
              ) : (
                <Link
                  className="link-to-confirm"
                  to={{
                    pathname: `/confirmation_page`,
                    state: {
                      albumsToLink: this.props.imgs,
                      albums: albums,
                      numberOfUsed: numberOfUsed,
                      totalArray: this.state.totalArray,
                      customerName: this.props.customerName,
                      password: sessionStorage.getItem("password"),
                      albumTypes: data.album_types,
                      discounts: feedbackData
                    }
                  }}
                >
                  {data.toConfirm || "TO CONFIRMATION PAGE"}
                </Link>
              )}
            </div>

            {/* <div className="form-footer">
              {capitanPrice === 0 ? (
                <Button
                  buttonName={`${data.pay_button}`}
                  disabled
                  className="disabled-album-button"
                  title="Please select at least one album"
                />
              ) : (
                <Button
                  target="blank"
                  type="submit"
                  onClick={this.onClick}
                  value="confirmed"
                  buttonName={`${capitanPrice} ${data.pay_button}`}
                />
              )} */}
            {/* <p>{data.tariff_plan_info}</p> */}
            {/* <Button
                type="submit"
                onClick={this.onClick}
                value="confirmed"
                buttonName={data.order_button_text}
              /> */}
            <br />
            {/* <button
                type="submit"
                onClick={this.onClick}
                value="denied"
                className="no-album"
              >
                {data.dont_like_any_album}
              </button> */}
            {/* </div> */}
          </form>
        ) : (
          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          <form className="form" onSubmit={this.onSubmit}>
            {/* <h1>{data.header}</h1> */}
            <h1>{data.were_chosen}</h1>
            <div className="subtext-wrapper">
              <p className="albums-to-buy">
                {data.will_be_print}
                {/* <span className="customer-name-bold">
                  {this.props.customerName}
                </span>
                <br />? מה לשלוח להדפסה */}
                {/* {data.albums_to_buy} */}
              </p>
              <p className="discount" dir="rtl">
                {/* {data.discount} */}
              </p>
            </div>
            <div className="container-for-three-albums">
              {albums.map(item => {
                let cover = photoCovers[item.id]; //
                if (!cover) {
                  return null;
                }
                cover = cover.find(el => el.is_main);

                {
                  /* let pic = cover.pic.split("/").slice(2);

                let prefixes = ["first_album", "second_album", "third_album"];
                let fields = ["_id", "_feedback", "_count"]; */
                }
                let albumsIDs = [
                  feedbackData.ready_order.first_album_id,
                  feedbackData.ready_order.second_album_id,
                  feedbackData.ready_order.third_album_id
                ];
                let albumsFeedbacks = [
                  feedbackData.ready_order.first_album_feedback,
                  feedbackData.ready_order.second_album_feedback,
                  feedbackData.ready_order.third_album_feedback
                ];
                let albumsCounts = [
                  !!feedbackData.ready_order.first_album_count,
                  !!feedbackData.ready_order.second_album_count,
                  !!feedbackData.ready_order.third_album_count
                ];
                let fID = albumsIDs.indexOf(item.id);

                return (
                  <div key={item.id} className="album">
                    <div className="album-container">
                      <div className="top-side-container">
                        <p />
                        {/* <p>{item.name}</p> */}
                        {/* <p>{data.pages}</p> http://memoriestore.com/static/media/*/}

                        <img
                          src={`http://memoriestore.com/static${cover.pic ||
                            "dd"}`}
                          onClick={() => this.showModal(item.id)}
                          alt="memoriestore"
                        />
                      </div>
                      <div className="bottom-side-container2">
                        {albumsCounts[fID] ? (
                          <div className="accept-cancel">
                            <img src={accept} alt="memoriestore" />
                            {/* <p>This album is ordered</p> */}
                            <p>{data.ordered_album}</p>
                          </div>
                        ) : (
                          <div className="accept-cancel">
                            <img src={cancel} alt="memoriestore" />
                            <p>{data.is_not_selected}</p>
                            {/* <p>Album is not selected</p> */}
                          </div>
                        )}
                      </div>
                    </div>
                    {/* <div className="mark-container">
                      <div className="top-side" />
                       <p>{data.more_book_text}</p> 
                      <div className="bottom-side">
                        <textarea
                          disabled
                          name={`${item.id}Comment`}
                          onChange={this.onChange}
                          placeholder={`${albumsFeedbacks[fID]}`}
                          value={this.state[item.id]}
                          defaultValue={""}
                          dir="rtl"
                        />
                      </div>
                    </div> */}
                    {this.state.show && this.state.selectedAlbum == item.id ? (
                      <Modal
                        selectedAlbum={
                          this.props.imgs[this.state.selectedAlbum]
                        }
                        show={this.state.show}
                        handleClose={this.hideModal}
                        albumNum={this.state.selectedAlbum}
                        isReverse={item.from_right_to_left}
                        /* orderText={data} */
                      />
                    ) : null}
                  </div>
                );
              })}
            </div>
            {feedbackData.type == "customer" && (
              <div className="form-footer">
                {/* <p>{data.tariff_plan_info}</p> */}
                <Button
                  type="submit"
                  onClick={this.onClick}
                  value="confirmed"
                  buttonName={data.order_button_text}
                />
                <br />
                {/* <button
                  type="submit"
                  onClick={this.onClick}
                  value="denied"
                  className="no-album"
                >
                  {data.dont_like_any_album}
                </button> */}
              </div>
            )}
          </form>
        )}
        <HeaderFooter
          className="footer-memoriestor"
          description={headerFooterData.description}
          faq={headerFooterData.faq}
          albumExamples={headerFooterData.album_examples}
          forDesigner={headerFooterData.for_designer}
        >
          <Button
            buttonName={headerFooterData.footer_button_text}
            onClick={this.routeChange}
          />
        </HeaderFooter>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.orderPage.data,
  locale: state.switchLocale.locale,
  isLoading: state.orderPage.isLoading,
  albums: state.checkPromocodeLogin.data.albums,
  customerType: state.checkPromocodeLogin.data.type,
  promocode: state.checkPromocodeLogin.data.promocode,
  customerName: state.checkPromocodeLogin.data.customer,
  feedbackData: state.checkPromocodeLogin.data,
  feedbackOptions: state.checkPromocodeLogin.data.feedback_options,
  headerFooterData: state.headerFooter.data,
  imgs: state.orderImages.data,
  promocodeLoading: state.checkPromocodeLogin.data.isLoading,
  arrayLength: state.orderImages.data.length
});

const mapDispatchToProps = dispatch => ({
  initOrderPageTriggered(locale, album, albumID) {
    dispatch(initOrderPageTriggered(locale, album, albumID));
  },
  sendCommentsSubmitted(comments) {
    dispatch(sendCommentsSubmitted(comments));
  },
  checkPromocodeSubmitted(promocode) {
    dispatch(checkPromocodeSubmitted(promocode));
  },
  sendLocationTriggered() {
    dispatch(sendLocationTriggered());
  },
  clearImages() {
    dispatch(clearImages());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderPage);
