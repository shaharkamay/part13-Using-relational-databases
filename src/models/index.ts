import Blog from './blog';
import User from './user';
import ReadingList from './reading-list';
import Session from './session';

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Blog, { through: ReadingList, as: 'reading' });
Blog.belongsToMany(User, { through: ReadingList });

Session.belongsTo(User);

export { Blog, User, ReadingList, Session };
