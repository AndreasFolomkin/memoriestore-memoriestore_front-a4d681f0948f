import React from 'react';
import Alert from "react-bootstrap/Alert";
import Preloader from "../componentsDumb/Preloader/Preloader";
import RegisterForm from "../components/RegisterForm/RegisterForm";
import Sidebar from "../components/Sidebar/Sidebar";
import {initRequestPageTriggered} from "../redux/actions/initRequestPage";
import {sendSessionSubmitted} from "../redux/actions/sendSession";
import {reduxFormBlur} from "../redux/actions/initReduxBlur";
import {initMainPageTriggered} from "../redux/actions/initMainPage";
import {sendLocationTriggered} from "../redux/actions/sendLocation";
import {connect} from "react-redux";


class RequestPageEng extends React.Component{


    componentDidMount() {
        this.props.initMainPageTriggered();

        this.props.initRequestPageTriggered(
            localStorage.getItem("locale") || undefined
        );
        const { tariffName, albumPrice } = this.props.location.state || {};
//    console.log("this.state.LOC", this.props.location.state);
        this.props.sendLocationTriggered(
            tariffName || "default",
            albumPrice || "default"
        );
    }

    submit = () => {
        const { tariffName, albumPrice } = this.props.location.state || {};
        const { familyTariff } = this.props;
        let t = tariffName || familyTariff.album_name;
        let a = albumPrice || familyTariff.price;
        sessionStorage.setItem("is_order_placed", "true");
        this.props.reduxFormBlur(t, a);
    };

    render() {
        const {
            requestPage,
            isLoading,
            form,
            familyTariff,
            tariffs,
            albums,
            isLoadingMain
        } = this.props;
        const pageName = this.props.match.params ? this.props.match.params.pageName : undefined;
        const { album_name, price } = pageName && tariffs[pageName + '_album'] ? tariffs[pageName + '_album']  : {};
        const { tariffName, albumPrice } = album_name && price ? {tariffName:album_name,albumPrice:price} : this.props.location.state || {};

        if (isLoading || isLoadingMain) {
            return <Preloader />;
        }

        return (
            <div className="request-page">
                <RegisterForm
                    familyTariff={familyTariff}
                    regData={requestPage}
                    tariffName={tariffName}
                    albumPrice={albumPrice}
                    className="regForm"
                    onSubmit={this.submit}
                />
                <Sidebar etap={1} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    requestPage: state.requestPage,
    isLoading: state.requestPage.isLoading,
    isLoadingMain: state.mainPage.isLoading,
    locale: state.switchLocale.locale,
    form: state.form,
    tariffs: state.mainPage.choose_tariff,
    familyTariff: state.mainPage.choose_tariff.family_album
});

const mapDispatchToProps = dispatch => ({
    initRequestPageTriggered(locale) {
        dispatch(initRequestPageTriggered(locale));
    },
    sendSessionSubmitted(t, a) {
        dispatch(sendSessionSubmitted(t, a));
    },
    reduxFormBlur(t, a) {
        dispatch(reduxFormBlur(t, a));
    },
    initMainPageTriggered(locale) {
        dispatch(initMainPageTriggered(locale));
    },
    sendLocationTriggered(tariffName, albumPrice) {
        dispatch(sendLocationTriggered(tariffName, albumPrice));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RequestPageEng);





