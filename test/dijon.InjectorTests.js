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

	this.bar = null;
}

module( 'dijon.Injector', {
	setup : function(){
		injector = new dijon.Injector();
	},
	teardown : function(){
		delete injector;
	}
});

test( 'unnamed mapSingleton', function(){
	injector.mapSingleton( TestClassA );
	ok( injector.hasMapping( TestClassA ) );
	ok( !injector.hasMapping( TestClassA, 'foo' ) );
})

test( 'named mapSingleton', function(){
	var name = 'foo';
	injector.mapSingleton( TestClassA, name );
	ok( injector.hasMapping( TestClassA, name ) );
	ok( ! injector.hasMapping( TestClassA ) );
})

test( 'unnamed mapValue', function(){
	var a = new TestClassA();
	injector.mapValue( TestClassA, a );
	ok( injector.hasMapping( TestClassA ) );
})

test( 'named mapValue', function(){
	var name = 'foo';
	var a = new TestClassA();
	injector.mapValue( TestClassA, a, name );
	ok( injector.hasMapping( TestClassA, name ) );
	ok( ! injector.hasMapping( TestClassA ) );
})

test( 'unnamed mapClass', function(){
	injector.mapClass( TestClassA, function(){} );
	ok( injector.hasMapping( TestClassA ) );
})

test( 'named mapClass', function(){
	var name = 'foo';
	injector.mapClass( TestClassA, function(){}, name );
	ok( injector.hasMapping( TestClassA, name ) );
	ok( ! injector.hasMapping( TestClassA ) );
})

test( 'unnamed mapSingletonOf', function(){
	injector.mapSingletonOf( TestClassA, function(){} );
	ok( injector.hasMapping( TestClassA ) );
})

test( 'named mapSingletonOf', function(){
	var name = 'foo';
	injector.mapSingletonOf( TestClassA, function(){}, name );
	ok( injector.hasMapping( TestClassA, name ) );
	ok( ! injector.hasMapping( TestClassA ) );
})

test( 'getInstance for unnamed mapSingleton', function(){
	injector.mapSingleton( TestClassA );
	var a = injector.getInstance( TestClassA );
	ok( a instanceof TestClassA );
	strictEqual( injector.getInstance( TestClassA ), a );
})

test( 'getInstance for named mapSingleton', function(){
	var name = 'foo';
	injector.mapSingleton( TestClassA, name );
	var a = injector.getInstance( TestClassA, name );
	ok( a instanceof TestClassA );
	strictEqual( injector.getInstance( TestClassA, name ), a );
})

test( 'getInstance for unnamed mapSingletonOf', function(){
	injector.mapSingletonOf( TestClassA, TestClassB );
	var b = injector.getInstance( TestClassA );
	ok( b instanceof TestClassB );
	strictEqual( injector.getInstance( TestClassA ), b );
})

test( 'getInstance for named mapSingletonOf', function(){
	var name = 'foo';
	injector.mapSingletonOf( TestClassA, TestClassB, name );
	var b = injector.getInstance( TestClassA, name );
	ok( b instanceof TestClassB );
	strictEqual( injector.getInstance( TestClassA, name ), b );
})

test( 'getInstance for mapClass', function(){
	injector.mapClass( TestClassA, TestClassB );
	var b = injector.getInstance( TestClassA );
	ok( b instanceof TestClassB );
	notStrictEqual( injector.getInstance( TestClassA ), b );
})

test( 'getInstance for mapValue', function(){
	var a = new TestClassA();
	injector.mapValue( TestClassA, a );
	strictEqual( injector.getInstance( TestClassA ), a );
})

test( 'instantiate for mapSingleton', function(){
	injector.mapSingleton( TestClassA );
	var a = injector.getInstance( TestClassA );
	notStrictEqual( injector.instantiate( TestClassA ), a );
})

test( 'instantiate for mapSingletonOf', function(){
	injector.mapSingletonOf( TestClassA, TestClassB );
	var b = injector.getInstance( TestClassA );
	notStrictEqual( injector.instantiate( TestClassA ), b );
})

test( 'instantiate for mapClass', function(){
	injector.mapClass( TestClassA, TestClassB );
	var b = injector.getInstance( TestClassA );
	notStrictEqual( injector.instantiate( TestClassA ), b );
})

test( 'instantiate for mapValue', function(){
	var a = new TestClassA();
	injector.mapValue( TestClassA, a );
	notStrictEqual( injector.instantiate( TestClassA ), a );
})

test( 'unnamed unmap', function(){
	injector.mapSingleton( TestClassA )
	injector.unmap( TestClassA );
	ok( ! injector.hasMapping( TestClassA ) );
})

test( 'named unmap', function(){
	var name = 'foo'
	injector.mapSingleton( TestClassA, name )
	injector.unmap( TestClassA, name );
	ok( ! injector.hasMapping( TestClassA, name ) );
})

test( 'addInjectionPoint', function(){
	injector.mapSingleton( TestClassA );
	injector.mapSingleton( TestClassB );
	injector.addInjectionPoint( TestClassB, 'bar', TestClassA );
	var b = injector.getInstance( TestClassB );
	ok( b.bar instanceof TestClassA );
})