import React, { Component } from "react";
import { View, StatusBar } from "react-native";
import ReduxNavigation from "../Navigation/ReduxNavigation";
import { connect } from "react-redux";
import withObservables from "@nozbe/with-observables";
import StartupActions from "../Redux/StartupRedux";

// Styles
import styles from "./Styles/RootContainerStyles";

class RootContainer extends Component {
  async generate() {
    const { database, startup } = this.props;
    await database.unsafeResetDatabase();
    let blogs = [];
    for (let i = 0; i < 100; i++) {
      blogs.push(
        database.collections.get("blogs").prepareCreate(blog => {
          blog.name = "test";
        })
      );
    }

    await database.batch(...blogs);

    // With Reactotron: Out of Memory Error (with 100 records)
    startup(blogs);
  }

  componentDidMount() {
    const { startup, blogs } = this.props;
    console.log("blogs:", blogs);

    if (!blogs) {
      this.generate();
    } else {
      // With Reactotron: Disconnect (with 100 records)
      startup(blogs);
    }
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

const mapDispatchToProps = dispatch => ({
  startup: blog => dispatch(StartupActions.startup(blog))
});

// Many observables to produce the Reactotron issue
const enhance = withObservables([], ({ database }) => ({
  blogs: database.collections
    .get("blogs")
    .query()
    .observe(),
  posts: database.collections
    .get("posts")
    .query()
    .observe(),
  comments: database.collections
    .get("comments")
    .query()
    .observe(),
  tests: database.collections
    .get("tests")
    .query()
    .observe()
}));

export default connect(
  null,
  mapDispatchToProps
)(enhance(RootContainer));
