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
    console.log("blogs:", blogs);
    // const blog = await database.collections.get("blogs").create(blog => {
    //   blog.name = "test";
    // });

    startup(blogs);
  }

  componentDidMount() {
    this.props.startup(this.props.blogs);
    // console.log("this.props.blogs:", this.props.blogs);
    // this.generate();
  }

  render() {
    // const { blogs } = this.props;
    // if (blogs) {
    //   this.props.startup(blogs);
    // }
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
