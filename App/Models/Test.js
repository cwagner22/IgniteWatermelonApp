import { Model, Q } from "@nozbe/watermelondb";
import { field, children, lazy } from "@nozbe/watermelondb/decorators";

export default class Test extends Model {
  static table = "tests";

  // static associations = {
  //   posts: { type: 'has_many', foreignKey: 'blog_id' },
  // }

  @field("name")
  name;

  // @children('posts')
  // posts

  // @lazy
  // nastyComments = this.collections
  //   .get('comments')
  //   .query(Q.on('posts', 'blog_id', this.id), Q.where('is_nasty', true))

  // async moderateAll() {
  //   await this.nastyComments.destroyAllPermanently()
  // }
}
