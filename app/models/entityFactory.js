var Sequelize = require('sequelize');
var sequelize = new Sequelize('rms', 'root', '123', {
    port: 3306,
    logging: false,
    define: {
        freezeTableName: true,
        underscored: true,
        timestamps: false,
        charset: 'utf8'
    }
});

var User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

var Resume = sequelize.define('resume', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: Sequelize.STRING,
    age: Sequelize.INTEGER,
    gender: Sequelize.STRING,
    address: Sequelize.STRING
});

Resume.belongsTo(User);
User.hasMany(Resume);

var Education = sequelize.define('education', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    range: Sequelize.STRING,
    school: Sequelize.STRING,
    major: Sequelize.STRING
});

Education.belongsTo(Resume);
Resume.hasMany(Education);

var Project = sequelize.define('project', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    range: Sequelize.STRING,
    company: Sequelize.STRING,
    description: Sequelize.TEXT
});

Project.belongsTo(Resume);
Resume.hasMany(Project);

module.exports = {
    sequelize: sequelize,
    User: User,
    Resume: Resume,
    Education: Education,
    Project: Project
};