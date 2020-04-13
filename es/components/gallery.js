var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _templateObject = _taggedTemplateLiteralLoose(['\n  margin-right: ', ';\n  overflow: hidden;\n  color: palevioletred;\n\n\t@media (max-width: 500px) {\n\t\tmargin-right: -', ';\n\t}\n'], ['\n  margin-right: ', ';\n  overflow: hidden;\n  color: palevioletred;\n\n\t@media (max-width: 500px) {\n\t\tmargin-right: -', ';\n\t}\n']),
    _templateObject2 = _taggedTemplateLiteralLoose(['\n\tbox-sizing: border-box;\n\tdisplay: block;\n\tfloat: left;\n\tline-height: 0;\n\tpadding-right: ', ';\n\tpadding-bottom: ', ';\n\toverflow: hidden;\n\n\t', '\n\n\t', '\n\n\t@media (max-width: 500px) {\n\t\tpadding-right: ', ';\n\t\tpadding-bottom: ', ';\n\t}\n'], ['\n\tbox-sizing: border-box;\n\tdisplay: block;\n\tfloat: left;\n\tline-height: 0;\n\tpadding-right: ', ';\n\tpadding-bottom: ', ';\n\toverflow: hidden;\n\n\t', '\n\n\t', '\n\n\t@media (max-width: 500px) {\n\t\tpadding-right: ', ';\n\t\tpadding-bottom: ', ';\n\t}\n']),
    _templateObject3 = _taggedTemplateLiteralLoose(['\n\t\twidth: 30%;\n  '], ['\n\t\twidth: 30%;\n  ']),
    _templateObject4 = _taggedTemplateLiteralLoose(['\n\t\tpadding-bottom: 0;\n\t\twidth: 40%;\n\t\t@media (max-width: 500px) {\n\t\t\tpadding-bottom: 0;\n\t\t}\n\t'], ['\n\t\tpadding-bottom: 0;\n\t\twidth: 40%;\n\t\t@media (max-width: 500px) {\n\t\t\tpadding-bottom: 0;\n\t\t}\n\t']),
    _templateObject5 = _taggedTemplateLiteralLoose(['\n\tborder: 0;\n\tdisplay: block;\n\theight: auto;\n\tmax-width: 100%;\n\twidth: auto;\n'], ['\n\tborder: 0;\n\tdisplay: block;\n\theight: auto;\n\tmax-width: 100%;\n\twidth: auto;\n']);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import Lightbox from 'react-images';

var gutter = {
	small: '2px',
	large: '4px'
};

var Base = styled.div(_templateObject, gutter.small, gutter.large);

var Thumbnail = styled.a(_templateObject2, gutter.small, gutter.small, function (props) {
	return props.landscape && css(_templateObject3);
}, function (props) {
	return props.square && css(_templateObject4);
}, gutter.large, gutter.large);

var Source = styled.img(_templateObject5);

var Gallery = function (_Component) {
	_inherits(Gallery, _Component);

	function Gallery() {
		_classCallCheck(this, Gallery);

		var _this = _possibleConstructorReturn(this, _Component.call(this));

		_this.state = {
			lightboxIsOpen: false,
			currentImage: 0
		};

		_this.closeLightbox = _this.closeLightbox.bind(_this);
		_this.gotoNext = _this.gotoNext.bind(_this);
		_this.gotoPrevious = _this.gotoPrevious.bind(_this);
		_this.gotoImage = _this.gotoImage.bind(_this);
		_this.handleClickImage = _this.handleClickImage.bind(_this);
		_this.openLightbox = _this.openLightbox.bind(_this);
		return _this;
	}

	Gallery.prototype.openLightbox = function openLightbox(index, event) {
		event.preventDefault();
		this.setState({
			currentImage: index,
			lightboxIsOpen: true
		});
	};

	Gallery.prototype.closeLightbox = function closeLightbox() {
		this.setState({
			currentImage: 0,
			lightboxIsOpen: false
		});
	};

	Gallery.prototype.gotoPrevious = function gotoPrevious() {
		this.setState({
			currentImage: this.state.currentImage - 1
		});
	};

	Gallery.prototype.gotoNext = function gotoNext() {
		this.setState({
			currentImage: this.state.currentImage + 1
		});
	};

	Gallery.prototype.gotoImage = function gotoImage(index) {
		this.setState({
			currentImage: index
		});
	};

	Gallery.prototype.handleClickImage = function handleClickImage() {
		if (this.state.currentImage === this.props.images.length - 1) return;

		this.gotoNext();
	};

	Gallery.prototype.renderGallery = function renderGallery() {
		var _this2 = this;

		var images = this.props.images;


		if (!images) return;

		var gallery = images.map(function (obj, i) {
			return React.createElement(
				Thumbnail,
				_extends({
					href: obj.src,
					key: i,
					onClick: function onClick(e) {
						return _this2.openLightbox(i, e);
					}
				}, obj.orientation),
				React.createElement(Source, { src: obj.thumbnail })
			);
		});

		return React.createElement(
			Base,
			null,
			gallery
		);
	};

	Gallery.prototype.render = function render() {
		return React.createElement(
			'div',
			{ className: this.props.className },
			this.props.heading && React.createElement(
				'h2',
				null,
				this.props.heading
			),
			this.props.subheading && React.createElement(
				'p',
				null,
				this.props.subheading
			),
			this.renderGallery(),
			React.createElement(Lightbox, {
				currentImage: this.state.currentImage,
				images: this.props.images,
				isOpen: this.state.lightboxIsOpen,
				onClickImage: this.handleClickImage,
				onClickNext: this.gotoNext,
				onClickPrev: this.gotoPrevious,
				onClickThumbnail: this.gotoImage,
				onClose: this.closeLightbox,
				showThumbnails: this.props.showThumbnails,
				spinner: this.props.spinner,
				spinnerColor: this.props.spinnerColor,
				spinnerSize: this.props.spinnerSize,
				theme: this.props.theme
			})
		);
	};

	return Gallery;
}(Component);

Gallery.displayName = 'Gallery';
Gallery.propTypes = process.env.NODE_ENV !== "production" ? {
	heading: PropTypes.string,
	images: PropTypes.array,
	showThumbnails: PropTypes.bool,
	subheading: PropTypes.string
} : {};

export default Gallery;