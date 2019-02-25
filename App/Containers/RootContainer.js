import React, { Component } from "react";
import { View, StatusBar } from "react-native";
import ReduxNavigation from "../Navigation/ReduxNavigation";
import { connect } from "react-redux";
import StartupActions from "../Redux/StartupRedux";

// Styles
import styles from "./Styles/RootContainerStyles";

class RootContainer extends Component {
  async generate() {
    const { database, startup } = this.props;
    await database.unsafeResetDatabase();
    const blog = await database.collections.get("blogs").create(blog => {
      blog.name = "test";
    });

    startup(blog);
  }

  componentDidMount() {
    this.props.startup();

    this.generate();
  }

  render() {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle="light-content" />
        <ReduxNavigation />
      </View>
    );
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = dispatch => ({
  startup: blog => dispatch(StartupActions.startup(blog))
});

export default connect(
  null,
  mapDispatchToProps
)(RootContainer);
