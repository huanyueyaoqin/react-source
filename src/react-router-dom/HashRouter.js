import React from "react";
import RouterContext from "./RouterContext.js";
import createBrowserHistory from "../history/createBrowserHistory";

/**
 * HashRouter只是一个容器，并没有DOM结构，它渲染的就是它的子组件
 * 它就是为了向下层组件传递 location
 */
export default class HashRouter extends React.Component {
  state = {
    location: {
      pathname: window.location.hash.slice(1) || "/", // #/user => /user
      state: window.history.state
    },
    history: createBrowserHistory()
  };
  componentDidMount() {
    window.addEventListener("hashchange", event => {
      this.setState({
        ...this.state,
        location: {
          ...this.state.location,
          pathname: window.location.hash.slice(1) || "/",
          state: this.locationState
        }
      });
    });
    // 给个默认值 /#/
    window.location.hash = window.location.hash || "/";
  }

  render() {
    let that = this;
    let history = this.state.history;
    let routerValue = {
      location: this.state.location,
      // 因为之前写的history 是browserhistory
      history: {
        ...this.state.history,
        push(to) {
          if (history.prompt) {
            let yes = window.confirm("离开此页面数据将清空,确认要离开吗？");
            if (!yes) return;
          }
          if (typeof to === "object") {
            let { pathname, state } = to;
            that.locationState = state; //源码hash是不能传state的，我们这里修改为可以传，也就是页面刷新后state还在
            window.location.hash = pathname;
          } else {
            window.location.hash = to;
          }
        },
        block(prompt = false) {
          history.prompt = prompt; //为了写block加的 源码和这个不太一致
          console.log(history);
        }
      }
    };

    console.log(routerValue);
    return (
      <RouterContext.Provider value={routerValue}>
        {this.props.children}
      </RouterContext.Provider>
    );
  }
}
