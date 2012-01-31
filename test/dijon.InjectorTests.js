/**
 * Created by JetBrains WebStorm.
 * User: creynder
 * Date: 21/09/11
 * Time: 14:53
 * To change this template use File | Settings | File Templates.
 */
var injector;

function TestClassA(){
	this.name = 'TestClassA';
}

function TestClassB(){
	this.name = 'TestClassB';

	this.bar = undefined;
}

//TODO: test Injectro#setValue

module( 'dijon.Injector', {
	setup : function(){
		injector = new dijon.Injector();
	},
	teardown : function(){
		injector = undefined;
	}
});

test( 'mapSingleton', function(){
	injector.mapSingleton( 'a', TestClassA );
	ok( injector.hasMapping( 'a' ) );
})

test( 'mapValue', function(){
	var a = new TestClassA();
	injector.mapValue( 'a', a );
	ok( injector.hasMapping( 'a' ) );
})

test( 'mapClass', function(){
	injector.mapClass( 'a', function(){} );
	ok( injector.hasMapping( 'a' ) );
})

test( 'getInstance for mapSingleton', function(){
	injector.mapSingleton( 'a', TestClassA );
    var inj = injector;
	var a = injector.getInstance( 'a' );
	ok( a instanceof TestClassA, 'must be instance of TestClassA' );
	strictEqual( injector.getInstance( 'a' ), a, 'must be single instance' );
})

test( 'getInstance for mapClass', function(){
	injector.mapClass( 'a', TestClassA );
	var a = injector.getInstance( 'a' );
	ok( a instanceof TestClassA );
	notStrictEqual( injector.getInstance( 'a' ), a );
})

test( 'getInstance for mapValue', function(){
	var a = new TestClassA();
	injector.mapValue( 'a', a );
	strictEqual( injector.getInstance( 'a' ), a );
})

test( 'instantiate for mapSingleton', function(){
	injector.mapSingleton( 'a', TestClassA );
	var a = injector.getInstance( 'a' );
	notStrictEqual( injector.instantiate( 'a' ), a, 'instantiate must always provide a new instance regardless of rules' );
})


test( 'instantiate for mapClass', function(){
	injector.mapClass( 'a', TestClassA );
	var a = injector.getInstance( 'a' );
	notStrictEqual( injector.instantiate( 'a' ), a );
})

test( 'instantiate for mapValue', function(){
	var a = new TestClassA();
	injector.mapValue( 'a', a );
	notStrictEqual( injector.instantiate( 'a' ), a );
})

test( 'unmap', function(){
	injector.mapSingleton( 'a', TestClassA )
	injector.unmap( 'a' );
	ok( ! injector.hasMapping( 'a' ) );
})

test( 'addOutlet', function(){
	injector.mapSingleton( 'a', TestClassA );
	injector.mapSingleton( 'b', TestClassB );
	injector.addOutlet( 'a', 'b', 'bar' );
	var b = injector.getInstance( 'b' );
	ok( b.bar instanceof TestClassA );
})

test( 'removeOutlet', function() {
	injector.mapSingleton( 'a', TestClassA );
	injector.mapSingleton( 'b', TestClassB );
	injector.addOutlet( 'a', 'b', 'bar' );
	injector.removeOutlet( 'b', 'bar' );
	var b = injector.getInstance( 'b' );
	strictEqual( b.bar, undefined );
})
