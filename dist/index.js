'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');

function stubContext(BaseComponent, context) {
  if (typeof context === 'undefined' || context === null) context = {};

  var _contextTypes = {},
      _context = context;

  try {
    Object.keys(_context).forEach(function (key) {
      _contextTypes[key] = React.PropTypes.any;
    });
  } catch (err) {
    throw new TypeError('createdStubbedContextComponent requires an object');
  }

  var StubbedContextParent = React.createClass({
    displayName: 'StubbedContextParent',
    childContextTypes: _contextTypes,
    getChildContext: function getChildContext() {
      return _context;
    },
    contextTypes: _contextTypes,

    render: function render() {
      return React.Children.only(this.props.children);
    }
  });

  var StubbedContextHandler = React.createClass({
    displayName: 'StubbedContextHandler',
    childContextTypes: _contextTypes,
    getChildContext: function getChildContext() {
      return _context;
    },

    getWrappedElement: function getWrappedElement() {
      return this._wrappedElement;
    },
    getWrappedParentElement: function getWrappedParentElement() {
      return this._wrappedParentElement;
    },

    render: function render() {
      this._wrappedElement = React.createElement(BaseComponent, _extends({}, this.state, this.props));
      this._wrappedParentElement = React.createElement(
        StubbedContextParent,
        null,
        this._wrappedElement
      );

      return this._wrappedParentElement;
    }
  });

  BaseComponent.contextTypes = _extends({}, BaseComponent.contextTypes, _contextTypes);

  StubbedContextHandler.getWrappedComponent = function () {
    return BaseComponent;
  };
  StubbedContextHandler.getWrappedParentComponent = function () {
    return StubbedContextParent;
  };

  return StubbedContextHandler;
}

module.exports = stubContext;

