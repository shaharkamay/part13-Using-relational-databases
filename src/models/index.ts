import Blog from './blog';
import User from './user';
import ReadingList from './reading-list';

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Blog, { through: ReadingList, as: 'reading' });
Blog.belongsToMany(User, { through: ReadingList });

export { Blog, User, ReadingList };
