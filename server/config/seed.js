/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import Asset from '../api/asset/asset.model';
import Log from '../api/log/log.model';

Thing.find({}).remove()
  .then(() => {
    Thing.create({
      friendlyname: 'Thing 1',
      macAddress : '123456789',
      info: 'Integration with popular tools such as Webpack, Gulp, Babel, TypeScript, Karma, '
            + 'Mocha, ESLint, Node Inspector, Livereload, Protractor, Pug, '
            + 'Stylus, Sass, and Less.',
      active: true
    }, {
      friendlyname: 'Thing 2',
      macAddress : '123456790',
      info: 'Built with a powerful and fun stack: MongoDB, Express, '
            + 'AngularJS, and Node.'
    }, {
      friendlyname: 'Thing 3',
      macAddress : '123456791',
      info: 'Build system ignores `spec` files, allowing you to keep '
            + 'tests alongside code. Automatic injection of scripts and '
            + 'styles into your index.html'
    }, {
      friendlyname: 'Thing 3',
      macAddress : '123456792',
      info: 'Best practice client and server structures allow for more '
            + 'code reusability and maximum scalability'
    }, {
      friendlyname: 'Thing 4',
      macAddress : '123456793',
      info: 'Build process packs up your templates as a single JavaScript '
            + 'payload, minifies your scripts/css/images, and rewrites asset '
            + 'names for caching.'
    }, {
      friendlyname: 'Thing 5',
      macAddress : '123456794',
      info: 'Easily deploy your app to Heroku or Openshift with the heroku '
            + 'and openshift subgenerators'
    }).then(() => {
      console.log('finished populating things');
    });
  });

User.find({}).remove()
  .then(() => {
    User.create({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      approved: true,
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      approved: true,
      password: 'admin'
    },
		{
      provider: 'local',
      name: 'Test User2',
      email: 'test2@example.com',
      password: 'test'
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
		},
    {
			"data":{"location":"Riverside","signText":"Street: Bryan Rd","image":"6","lat":"30.635671","lon":"-96.4678"},
			"tag":{"epcVal":"0xe20021002000558213f70272"}
		},
		{
			"data":{"location":"Riverside","signText":"Street: Seventh St","image":"7","lat":"30.635671","lon":"-96.4678"},
			"tag":{"epcVal":"0xe20021002000549513b20272"}
		},
		{
			"data":{"location":"Riverside","signText":"Yield","image":"8","lat":"30.635671","lon":"-96.4678"},
			"tag":{"epcVal":"0xe2002100200050c315120272"}
		},
		{
			"data":{"location":"Riverside","signText":"Street: Project Dr","image":"9","lat":"30.633712","lon":"-96.4727"},
			"tag":{"epcVal":"0xe200210020005aca14610272"}
		},
		{
			"data":{"location":"Riverside","signText":"Street: Avenue B","image":"10","lat":"30.633712","lon":"-96.4727"},
			"tag":{"epcVal":"0xe20021002000571915260272"}
		},
		{
			"data":{"location":"Riverside","signText":"Street: Stirling Dr","image":"11","lat":"30.633164","lon":"-96.4727"},
			"tag":{"epcVal":"0xe200210020005396139f0272"}
		},
		{
			"data":{"location":"Riverside","signText":"Street: Avenue B","image":"12","lat":"30.633164","lon":"-96.4727"}
		})
    .then(() => {
      console.log('finished populating assets');
    });
  });

  Log.find({}).remove()
  .then(() => {
    var d = new Date(100000);
    Log.create({
			logData:{location:"Riverside",signText:'Stop',date: d,lat:'30.639117',lon:'-96.4678', readCount:'0'},
			tag:{epcVal:'0xe200210020005b4d153e0272'}
		},
    {
			logData:{location:"Riverside",signText:'Stop',date: d,lat:'30.639117',lon:'-96.4678', readCount:'3'},
			tag:{epcVal:'0xe200210020005b4d153e0272'}
		},
    {
			logData:{location:"Riverside",signText:'Stop',date: d,lat:'30.639117',lon:'-96.4678', readCount:'7'},
			tag:{epcVal:'0xe200210020005b4d153e0272'}
		},
    {
			logData:{location:"Riverside",signText:'Stop',date: d,lat:'30.639117',lon:'-96.4678', readCount:'7'},
			tag:{epcVal:'0xe200210020005b4d153e0272'}
		},
    {
			logData:{location:"Riverside",signText:'Stop',date: d,lat:'30.639117',lon:'-96.4678', readCount:'7'},
			tag:{epcVal:'0xe200210020005b4d153e0272'}
		},
    {
			logData:{location:"Riverside",signText:'Stop',date: d,lat:'30.639117',lon:'-96.4678', readCount:'6'},
			tag:{epcVal:'0xe200210020005b4d153e0272'}
		},
    {
			logData:{location:"Riverside",signText:'Stop',date: d,lat:'30.639117',lon:'-96.4678', readCount:'5'},
			tag:{epcVal:'0xe200210020005b4d153e0272'}
		},
		{
			logData:{location:"Riverside",signText:'Street: Stirling Dr',date: d, lat:'30.633164', lon:'-96.4727', readCount:'8'},
			tag:{epcVal:'0xe200210020005396139f0272'}
		},
    {
			logData:{location:"Riverside",signText:'Street: Stirling Dr',date: d, lat:'30.633164', lon:'-96.4727', readCount:'8'},
			tag:{epcVal:'0xe200210020005396139f0272'}
		},
    {
			logData:{location:"Riverside",signText:'Street: Stirling Dr',date: d, lat:'30.633164', lon:'-96.4727', readCount:'8'},
			tag:{epcVal:'0xe200210020005396139f0272'}
		},
    {
			logData:{location:"Riverside",signText:'Street: Stirling Dr',date: d, lat:'30.633164', lon:'-96.4727', readCount:'8'},
			tag:{epcVal:'0xe200210020005396139f0272'}
		})
    .then(() => {
      console.log('finished populating logs');
    });
  });
