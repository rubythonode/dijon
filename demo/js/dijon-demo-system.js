/**
 * @author Camille Reynders
 * Date: 30/09/11
 * Time: 11:10
 */

/**
 * @namespace
 */
var dijondemo = {
	fqn : 'dijondemo'
}

/**
 * @constructor
 * @extends dijon.Context
 */
dijondemo.DemoContext = function(){
	this.fqn = 'dijondemo.DemoContext'
	console.log( this.fqn + " constructor" );
}
dijondemo.DemoContext.prototype = new dijon.Context();
dijondemo.DemoContext.prototype.constructor = dijondemo.DemoContext;

dijondemo.DemoContext.prototype.startup = function(){
	console.log( this.fqn + " startup" );
	
	this.commandMap.mapEvent( dijondemo.systemEvents.startup, dijondemo.StartupCommand, true );

	this.eventDispatcher.dispatchEvent( dijondemo.systemEvents.startup );
}

dijondemo.StartupCommand = function(){
	this.fqn = 'dijondemo.StartupCommand';
}
dijondemo.StartupCommand.prototype = new dijon.Command();
dijondemo.StartupCommand.prototype.constructor = dijondemo.StartupCommand;
dijondemo.StartupCommand.prototype.execute = function(){
	console.log( "dijondemo.StartupCommand execute" );

	this.injector.mapSingleton( dijondemo.classRefs.twitterService.impl );

	this.eventMap.addRuledMapping( dijondemo.viewEvents.loadTwitterStream, dijondemo.classRefs.twitterService.impl, dijondemo.classRefs.twitterService.loadTwitterStream )
}

dijondemo.JQueryTwitterService = function(){
	this.qcn = 'JQueryTwitterService';
}
dijondemo.JQueryTwitterService.prototype = new dijon.Actor();
dijondemo.JQueryTwitterService.prototype.constructor = dijondemo.JQueryTwitterService;

dijondemo.JQueryTwitterService.prototype.loadStream = function( username, numTweets ){
	console.log( this.qcn + ' loadStream' );
	var self = this;
	$.ajax({
		url: 'http://api.twitter.com/1/statuses/user_timeline.json/',
		type: 'GET',
		dataType: 'jsonp',
		data: {
			screen_name: username,
			include_rts: true,
			count: numTweets,
			include_entities: true
		},
		success: function( response ){
			self.eventDispatcher.dispatchEvent( dijondemo.systemEvents.twitterStreamLoaded, response );
		},
		error: function(){
			alert( 'error' );
		}
	});
}




dijondemo.systemEvents = {
	startup : 'dijondemo.systemEvents.startup',
	twitterStreamLoaded : 'dijondemo.systemEvents.twitterStreamLoaded'
}

dijondemo.classRefs = {
	twitterService : {
		impl : dijondemo.JQueryTwitterService,
		loadTwitterStream: dijondemo.JQueryTwitterService.prototype.loadStream
	}
}