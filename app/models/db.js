/* ==========================================================
 * 创建表
 * ========================================================== */
// sequelize.sync({
//  force: true
// }).success(function() {
//  console.log('ok');
// }).error(function(err) {
//  console.log(err);
// });
/* ==========================================================
 * 插入数据
 * ========================================================== */
User.create({
    id: 1,
    name: 'hugo yin',
    email: 'hanchun.yin@leediancn.com',
    password: '123456'
}).success(function(user) {
    Resume.create({
        id: 1,
        name: 'hanchun yin',
        email: 'hanchun.yin@leediancn.com',
        age: 21,
        gender: '男',
        address: '宜山路900号A#306',
        user_id: user.id
    }).success(function(resume) {
        console.log('resume1 created successfully!');
        Education.bulkCreate([{
            id: 1,
            resume_id: resume.id,
            school: 'University of Awesome',
            range: 'January 2008-October 2013',
            major: 'MAJORED IN AWESOME'
    }, {
            id: 2,
            resume_id: resume.id,
            school: 'University of Technology, Sydney',
            range: 'April 2005-September 2007',
            major: 'BACHELOR OF ARTS'
    }]).success(function(education) {
            console.log('education created successfully!');
        }).error(function(err) {
            console.log(err);
        });
        Project.bulkCreate([
            {
                id: 1,
                resume_id: resume.id,
                company: 'LEEDIAN CN',
                range: 'July 2013-PRESENT',
                description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec lobortis varius turpis sit amet commodo. Aenean a diam id nisl dodales ultrices. Proin id leo ut turpis placerat pharetra. Nunc et lacus sed arcu lobortis pharetra. Mauris sagittis consectetur sapien pretium aliquet.'
    }, {
                id: 2,
                resume_id: resume.id,
                company: 'GOOGLE HK',
                range: 'July 2012-JUNE 2013',
                description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec lobortis varius turpis sit amet commodo. Aenean a diam id nisl dodales ultrices. Proin id leo ut turpis placerat pharetra. Nunc et lacus sed arcu lobortis pharetra. Mauris sagittis consectetur sapien pretium aliquet.'
    }]).success(function(project) {
            console.log('project created successfully!')
        }).error(function(err) {
            console.log(err);
        });
    }).error(function(err) {
        console.log(err);
    });
    //resume2
    // Resume.create({
    //  id: 2,
    //  name: 'finance resume',
    //  email: 'hanchun.yin@leediancn.com',
    //  age: 21,
    //  gender: '男',
    //  address: '宜山路900号A#306',
    //  user_id: user.id
    // }).success(function(resume) {
    //  console.log("resume1 created successfully!");
    //  Education.bulkCreate([{
    //      id: 1,
    //      resume_id: resume.id,
    //      school: 'University of Awesome',
    //      range: 'January 2008-October 2013',
    //      major: 'MAJORED IN AWESOME'
    //    }, {
    //      id: 2,
    //      resume_id: resume.id,
    //      school: 'University of Technology, Sydney',
    //      range: 'April 2005-September 2007',
    //      major: 'BACHELOR OF ARTS'
    //    }]).success(function(education) {
    //      console.log("education created successfully!");
    //  }).error(function(err) {
    //      console.log(err);
    //  });
    //  Project.bulkCreate([
    //      {
    //          id: 1,
    //          resume_id: resume.id,
    //          company: 'LEEDIAN CN',
    //          range: 'July 2013-PRESENT',
    //          description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec lobortis varius turpis sit amet commodo. Aenean a diam id nisl dodales ultrices. Proin id leo ut turpis placerat pharetra. Nunc et lacus sed arcu lobortis pharetra. Mauris sagittis consectetur sapien pretium aliquet.'
    //    }, {
    //          id: 2,
    //          resume_id: resume.id,
    //          company: 'GOOGLE HK',
    //          range: 'July 2012-JUNE 2013',
    //          description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec lobortis varius turpis sit amet commodo. Aenean a diam id nisl dodales ultrices. Proin id leo ut turpis placerat pharetra. Nunc et lacus sed arcu lobortis pharetra. Mauris sagittis consectetur sapien pretium aliquet.'
    //    }]).success(function(project) {
    //      console.log("project created successfully!")
    //  }).error(function(err) {
    //      console.log(err);
    //  });
    // }).error(function(err) {
    //  console.log(err);
    // });
}).error(function(err) {
    console.log(err);
});