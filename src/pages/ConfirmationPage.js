import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Link, Redirect } from "react-router-dom";

import { initConfirmPageTriggered } from "../redux/actions/initConfirmationPage";
import { checkPromocodeSubmitted } from "../redux/actions/checkPromocodeLogin";
import {
  initOrderImagesTriggered,
  clearImages
} from "../redux/actions/initOrderImages";
import { sendOrderTriggered } from "../redux/actions/sendOrder";
import { sendCommentsSubmitted } from "../redux/actions/sendComments";
import HeaderFooter from "../components/HeaderFooter/HeaderFooter";
import Button from "../components/Button/Button";
import Preloader from "../componentsDumb/Preloader/Preloader";
import SliderSlick from "../components/SlickSlider/SliderSlick";
import Select from "../components/Select/ConfirmSelect";

import Logo from "../img/mem.jpeg";
import "./styles/ConfirmationPage.css";

class ConfirmPage extends Component {
  componentDidMount() {
    this.props.clearImages();
    let {
      numberOfUsed,
      totalArray,
      customerName,
      albums
    } = this.props.location.state;
    let res = {};
    res.customer_name = customerName;
    res.total_array = totalArray;
    res.number_of_used = numberOfUsed.map((i, key) => {
      return `Designer:${albums[key].designer_name}. Ordered albums: ${i}`;
    });
    this.props.initConfirmPageTriggered(
      localStorage.getItem("locale") || undefined
    );
    this.props.sendCommentsSubmitted(res);
  }

  constructor(props) {
    super(props);
    this.routeChange = this.routeChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.formRef = React.createRef();
    let { albums, numberOfUsed } = this.props.location.state;
    this.state = {
      priceArr: albums.map((i, key) => {
        if (
          +Object.keys(numberOfUsed)[key] === key &&
          Object.values(numberOfUsed)[key] !== 0
        ) {
          return { [key]: i.price };
        } else {
          return 0;
        }
      }),
      password: this.props.location.state.password
    };
  }
  componentWillUnmount() {
    window.history.state.state = {};
    this.props.location.state = {};
  }

  routeChange() {
    let path = `/who_we_are`;
    this.props.history.push(path);
  }
  getAr = priceObj => {
    this.setState({
      Remove: [this.state.priceArr.splice(Object.keys(priceObj), 1, priceObj)]
    });
  };

  getSumm = array => {
    let { numberOfUsed } = this.props.location.state;
    var age = 0;
    for (var i = 0; i < array.length; i++) {
      age +=
        +Object.keys(numberOfUsed)[i] === i
          ? +Object.values(array[i]) * Object.values(numberOfUsed)[i]
          : null;
    }
    return age;
  };
  onClick = e => {
    let {
      albums,
      numberOfUsed,
      totalArray,
      customerName
    } = this.props.location.state;
    e.preventDefault();
    this.formRef.current.submit();
    //создание реф формы (линк на форму) и запуск её метода submit
    this.props.sendOrderTriggered(
      {
        customerName: customerName,
        numberOfUsed: numberOfUsed.map((i, key) => {
          return `Designer:${albums[key].designer_name}. Ordered albums: ${i}`;
        }),
        userReviews: totalArray,
        totalSum: this.getSumm(this.state.priceArr)
      },
      this.props.history
    );
  };

  render() {
    let {
      albumsToLink,
      albums,
      numberOfUsed,
      albumTypes,
      discounts
    } = this.props.location.state;
    const { confirmData } = this.props;
    let imgs = [
      albumsToLink[Object.keys(albumsToLink)[0]],
      albumsToLink[Object.keys(albumsToLink)[1]],
      albumsToLink[Object.keys(albumsToLink)[2]]
    ];
    let newAr = imgs.map((item, key) => {
      item[0]["albumKey"] = key;
      let empty = [];
      for (let i = 0; i < Object.values(numberOfUsed)[key]; i++) {
        empty.push(item);
      }
      return empty;
    });
    let newLongArr = newAr.reduce(function(acc, current) {
      return [...acc, ...current];
    }, []);
    const { headerFooterData } = this.props;
    let totalAmount = this.getSumm(this.state.priceArr);
    let discount = () => {
      if (discounts.discount_in_percents !== 0) {
        return discounts.discount_in_percents;
      } else {
        return discounts.discount_in_currency;
      }
    };

    let priceWithDiscount = () => {
      if (discounts.discount_in_percents !== 0) {
        return parseInt((totalAmount * (100 - discount())) / 100);
      } else {
        return totalAmount - discount();
      }
    };

    return (
      <div>
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

        <h1 className="confirm-header">
          {confirmData.header || "Confirmation page"}
        </h1>

        {newLongArr.map((newLongArr, imgKey) => {
          return (
            <SliderSlick
              className={"confirm-page-slick"}
              slickPictures={newLongArr}
              key={imgKey}
              Price={albums.map((albumItem, key) => {
                return newLongArr[0].albumKey === key ? (
                  <Select
                    albumTypes={albumTypes}
                    selectText={confirmData.selectHeader}
                    albumItem={albumItem}
                    key={key}
                    selectKey={key}
                    imgKey={imgKey}
                    getAr={this.getAr}
                  />
                ) : null;
              })}
            />
          );
        })}

        <div className="to-pay">
          <div className="row social-media-logos">
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
                value={`${priceWithDiscount()}.00`}
                name="amount"
              />
              <input type="hidden" value="54" name="orderid" />
              <input type="hidden" value="hello from mem" name="description" />
              <input type="hidden" value="10" name="max_payments" />
            </form>
          </div>
        </div>
        <>
          <div className="confirm-prices-container">
            <h4>
              {confirmData.totalPrice + ": "} {totalAmount}
            </h4>
            {discount() !== 0 ? (
              <>
                <p>
                  {confirmData.discount + ": "}
                  {discount()}
                </p>
                <p>
                  {confirmData.priceWithDisc + ": "}
                  <span>{priceWithDiscount()}</span>
                </p>
              </>
            ) : null}
            <div />
          </div>
          <div className="confirm-page-button">
            <Button
              target="blank"
              type="submit"
              onClick={this.onClick}
              value="confirmed"
              buttonName={confirmData.confirmButton}
            />
          </div>
        </>
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
  isLoading: state.confirmPage.isLoading,
  headerFooterData: state.headerFooter.data,
  locale: state.switchLocale.locale,
  confirmData: state.confirmPage.data,
  reduxImages: state.orderImages.data
});

const mapDispatchToProps = dispatch => ({
  initConfirmPageTriggered(locale) {
    dispatch(initConfirmPageTriggered(locale));
  },
  sendCommentsSubmitted(comments) {
    dispatch(sendCommentsSubmitted(comments));
  },
  sendOrderTriggered(order, path) {
    dispatch(sendOrderTriggered(order, path));
  },
  clearImages() {
    dispatch(clearImages());
  }
  // initOrderImagesTriggered(id) {
  //   dispatch(initOrderImagesTriggered(id));
  // }
  // checkPromocodeSubmitted(promocode) {
  //   dispatch(checkPromocodeSubmitted(promocode));
  // }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmPage);
