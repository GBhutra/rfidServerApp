/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import Asset from '../api/asset/asset.model';

Thing.find({}).remove()
  .then(() => {
    Thing.create({
      name: 'Development Tools',
      info: 'Integration with popular tools such as Webpack, Gulp, Babel, TypeScript, Karma, '
            + 'Mocha, ESLint, Node Inspector, Livereload, Protractor, Pug, '
            + 'Stylus, Sass, and Less.'
    }, {
      name: 'Server and Client integration',
      info: 'Built with a powerful and fun stack: MongoDB, Express, '
            + 'AngularJS, and Node.'
    }, {
      name: 'Smart Build System',
      info: 'Build system ignores `spec` files, allowing you to keep '
            + 'tests alongside code. Automatic injection of scripts and '
            + 'styles into your index.html'
    }, {
      name: 'Modular Structure',
      info: 'Best practice client and server structures allow for more '
            + 'code reusability and maximum scalability'
    }, {
      name: 'Optimized Build',
      info: 'Build process packs up your templates as a single JavaScript '
            + 'payload, minifies your scripts/css/images, and rewrites asset '
            + 'names for caching.'
    }, {
      name: 'Deployment Ready',
      info: 'Easily deploy your app to Heroku or Openshift with the heroku '
            + 'and openshift subgenerators'
    });
  });

User.find({}).remove()
  .then(() => {
    User.create({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    })
    .then(() => {
      console.log('finished populating users');
    });
  });

  Asset.find({}).remove()
  .then(() => {
    Asset.create({
			data:{location:"Riverside",signText:'Stop',image:'1',lat:'30.639117',lon:'-96.4678'},
			tag:{epcVal:'0xe200210020005b4d153e0272'}
		},
		{
			data:{location:"Riverside",signText:'Stop',image:'2',lat:'30.638895',lon:'-96.4676'},
			tag:{epcVal:'0xe2002100200050ce15100272'}
		},
		{
			data:{location:"Riverside",signText:'Street: Bryan Rd',image:'3',lat:'30.638921',lon:'-96.4678'},
			tag:{epcVal:'0xe200210020005311147b0272'}
		},
		{
			data:{location:"Riverside",signText:'Street: Bryan Rd',image:'4',lat:'30.637929',lon:'-96.4678'},
			tag:{epcVal:'0xe20021002000545915620272'}
		},
		{
			data:{location:"Riverside",signText:'Street: Sixth St',image:'5',lat:'30.637929',lon:'-96.4678'},
			tag:{epcVal:'0xe200210020005b45153c0272'}
		})
    .then(() => {
      console.log('finished populating assets');
    });
  });
