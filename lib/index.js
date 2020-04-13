'use strict';

exports.__esModule = true;

var _class, _temp, _initialiseProps;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _buildUrl = require('build-url');

var _buildUrl2 = _interopRequireDefault(_buildUrl);

var _gallery = require('./components/gallery');

var _gallery2 = _interopRequireDefault(_gallery);

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * generates a gallery and lightbox using the given flickr api key and details
 */
var FlickrLightbox = (_temp = _class = function (_Component) {
  _inherits(FlickrLightbox, _Component);

  function FlickrLightbox(props) {
    _classCallCheck(this, FlickrLightbox);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _initialiseProps.call(_this);

    _this.state = { images: [] };
    return _this;
  }

  FlickrLightbox.prototype.componentWillMount = function componentWillMount() {
    this.queryFlickrApi(this.props);
  };

  FlickrLightbox.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    this.queryFlickrApi(nextProps);
  };

  FlickrLightbox.prototype.render = function render() {
    return _react2.default.createElement(_gallery2.default, {
      images: this.state.images,
      className: this.props.className
    });
  };

  return FlickrLightbox;
}(_react.Component), _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.generateApiUrl = function (props) {
    var extras = ["url_o", "url_m", props.thumbnailSizeParam, "license", "date_upload", "date_taken", "icon_server", "original_format", "last_update", "geo", "tags", "machine_tags", "o_dims", "views", "media", "path_alias", "owner_name"];
    return (0, _buildUrl2.default)('https://api.flickr.com', {
      path: 'services/rest/',
      queryParams: {
        method: props.user_id || props.album_id || props.searchTerm ? 'flickr.photos.search' : 'flickr.photos.getRecent',
        format: 'json',
        api_key: props.api_key || '',
        user_id: props.user_id || '',
        album_id: props.album_id || '',
        text: props.searchTerm || '',
        per_page: props.limit || Number.MAX_SAFE_INTEGER,
        nojsoncallback: '?',
        extras: extras.join(',')
      }
    });
  };

  this.queryFlickrApi = function (props) {
    (0, _isomorphicFetch2.default)(_this2.generateApiUrl(props)).then(function (response) {
      return response.json();
    }).then(function (data) {
      if (!data.photos) {
        throw data;
      }
      _this2.setState({
        images: data.photos.photo.map(function (p) {
          return {
            src: p.url_o || p.url_m || 'https://s.yimg.com/pw/images/en-us/photo_unavailable.png',
            thumbnail: p[props.thumbnailSizeParam],
            caption: (p.title || 'Untitled') + ': Photo by ' + p.ownername
          };
        })
      });
    }).catch(function (e) {
      return console.error(e);
    });
  };
}, _temp);


FlickrLightbox.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
  * api key for accessing flickr (see [here](https://www.flickr.com/services/api/misc.api_keys.html) for more details)
  */
  api_key: _propTypes2.default.string.isRequired,
  /**
  * flickr user id of user to fetch photos from
  */
  user_id: _propTypes2.default.string,
  /**
  * flickr album id to fetch photos from
  */
  album_id: _propTypes2.default.string,
  /**
  * integer limit of photos to be displayed
  */
  limit: _propTypes2.default.number,
  /**
  * search term used to filter photos (searches using title, description and tags)
  */
  searchTerm: _propTypes2.default.string,
  /**
  * class name to be applied to root div
  */
  className: _propTypes2.default.string,
  /**
  * class name to be applied to root div
  */
  thumbnailSizeParam: _propTypes2.default.string
} : {};

FlickrLightbox.defaultProps = {
  thumbnailSizeParam: 'url_sq'
};

exports.default = FlickrLightbox;
module.exports = exports['default'];