var container, stats;
var camera, scene, renderer;
var group, text, plane;

var speed = 50;

var pointLight;


var targetRotation = 0;
var targetRotationOnMouseDown = 0;

var mouseX = 0;
var mouseXOnMouseDown = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var delta = 1, clock = new THREE.Clock();

var ringShape, particleCloud, sparksEmitter, emitterPos;
var _rotation = 0;
var timeOnShapePath = 0;

var composer;


function init() {

  container = document.createElement( 'div' );
  $('#three').append( container );

  // CAMERA

  camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 2000 );
  camera.position.set( 0, 150, 400 );

  // SCENE

  scene = new THREE.Scene();

  // LIGHTS

  var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
  directionalLight.position.set( 0, -1, 1 );
  directionalLight.position.normalize();
  scene.add( directionalLight );

  pointLight = new THREE.PointLight( 0xffffff, 2, 300 );
  pointLight.position.set( 0, 0, 0 );
  scene.add( pointLight );


  var material = new THREE.MeshFaceMaterial( [
    new THREE.MeshLambertMaterial( { color: 0xffffff, shading: THREE.FlatShading, opacity: 0.95 } ),
    new THREE.MeshLambertMaterial( { color: 0xffffff } )
  ] );



  group = new THREE.Group();
  scene.add( group );

        // Create particle objects

  var particlesLength = 70000;

  var particles = new THREE.Geometry();

    function newpos( x, y, z ) {

      return new THREE.Vector3( x, y, z );

    }


    var Pool = {

      __pools: [],

      // Get a new Vector

      get: function() {
        if ( this.__pools.length > 0 ) {
          return this.__pools.pop();
        }
        return null;
      },

      // Release a vector back into the pool

      add: function( v ) {
        this.__pools.push( v );
      }
    };


    for ( i = 0; i < particlesLength; i ++ ) {
      particles.vertices.push( newpos( Math.random() * 200 - 100, Math.random() * 100 + 150, Math.random() * 50 ) );
        Pool.add( i );

    }


    // Create pools of vectors

    attributes = {
      size:  { type: 'f', value: [] },
      pcolor: { type: 'c', value: [] }
    };

    var sprite = generateSprite() ;

  texture = new THREE.Texture( sprite );
  texture.needsUpdate = true;

  uniforms = {

        texture:   { type: "t", value: texture }

  };

  function generateSprite() {

    var canvas = document.createElement( 'canvas' );
    canvas.width = 180;
    canvas.height = 180;

    var context = canvas.getContext( '2d' );

    context.beginPath();
    context.arc( 64, 64, 60, 0, Math.PI * 2, false) ;

    context.lineWidth = 0.5;
    context.stroke();
    context.restore();

    var gradient = context.createRadialGradient( canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2 );

    gradient.addColorStop( 0, 'rgba(255,255,255,1)' );
    gradient.addColorStop( 0.2, 'rgba(255,255,255,1)' );
    gradient.addColorStop( 0.4, 'rgba(200,200,200,1)' );
    gradient.addColorStop( 1, 'rgba(0,0,0,1)' );

    context.fillStyle = gradient;

    context.fill();

    return canvas;

  }


  var shaderMaterial = new THREE.ShaderMaterial( {

    uniforms: uniforms,
    attributes: attributes,

    vertexShader: document.getElementById( 'vertexshader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentshader' ).textContent,

    blending: THREE.AdditiveBlending,
    depthWrite: false,
    transparent: true

  });

  particleCloud = new THREE.PointCloud( particles, shaderMaterial );

  particleCloud.sortParticles = true;

  var vertices = particleCloud.geometry.vertices;
  var values_size = attributes.size.value;
  var values_color = attributes.pcolor.value;

  for( var v = 0; v < vertices.length; v ++ ) {
    values_size[ v ] = 50;
    values_color[ v ] = new THREE.Color( 0x000000  );
    particles.vertices[ v ].set( Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY );
  }

  group.add( particleCloud );
  particleCloud.y = 800;


  ringShape = new THREE.Shape();
  ringShape.moveTo( 0 , 25);
  ringShape.arc(15, 25, 35, 0, Math.PI * 2, false);
  curve = ringShape.curves[0];

  var hue = 0;

  var setTargetParticle = function() {

    var target = Pool.get();
    values_size[ target ] = Math.random() * 200 + 100;

    return target;

  };

  var onParticleCreated = function( p ) {

    var position = p.position;
    p.target.position = position;

    var target = p.target;

    if ( target ) {

      hue += 0.0003 * delta;
      if ( hue > 1 ) hue -= 1;

      timeOnShapePath += 0.00035 * delta;
      if ( timeOnShapePath > 1 ) timeOnShapePath -= 1;

      var pointOnShape = ringShape.getPointAt( timeOnShapePath );

      emitterpos.x = pointOnShape.x * 5 - 100;
      emitterpos.y = -pointOnShape.y * 5 + 400;

      pointLight.position.x = emitterpos.x;
      pointLight.position.y = emitterpos.y;
      pointLight.position.z = 100;

      particles.vertices[ target ] = p.position;

      values_color[ target ].setHSL( hue, 0.6, 0.1 );

      pointLight.color.setHSL( hue, 0.8, 0.5 );
    };

  };

  var onParticleDead = function( particle ) {

    var target = particle.target;

    if ( target ) {
      // Hide the particle
      values_color[ target ].setRGB( 0, 0, 0 );
      particles.vertices[ target ].set( Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY );

      // Mark particle system as available by returning to pool

      Pool.add( particle.target );
    }
  };


  sparksEmitter = new SPARKS.Emitter( new SPARKS.SteadyCounter( 500 ) );

  emitterpos = new THREE.Vector3( 0, 0, 0 );

  sparksEmitter.addInitializer( new SPARKS.Position( new SPARKS.PointZone( emitterpos ) ) );
  sparksEmitter.addInitializer( new SPARKS.Lifetime( 1, 8 ));
  sparksEmitter.addInitializer( new SPARKS.Target( null, setTargetParticle ) );


  sparksEmitter.addInitializer( new SPARKS.Velocity( new SPARKS.PointZone( new THREE.Vector3( 0, -5, 1 ) ) ) );

  sparksEmitter.addAction( new SPARKS.Age() );
  sparksEmitter.addAction( new SPARKS.Accelerate( 0, 0, -50 ) );
  sparksEmitter.addAction( new SPARKS.Move() );
  sparksEmitter.addAction( new SPARKS.RandomDrift( 100, 50, 1500 ) );


  sparksEmitter.addCallback( "created", onParticleCreated );
  sparksEmitter.addCallback( "dead", onParticleDead );
  sparksEmitter.start();
  // End Particles

  // renderer = new THREE.WebGLRenderer();
  renderer = new THREE.WebGLRenderer( { clearColor: 0xff0000, clearAlpha: 1 } );
  renderer.setSize( window.innerWidth, window.innerHeight );

  container.appendChild( renderer.domElement );

  // POST PROCESSING

  var effectFocus = new THREE.ShaderPass( THREE.FocusShader );
  var effectCopy = new THREE.ShaderPass( THREE.CopyShader );


  effectFocus.uniforms[ 'sampleDistance' ].value = 0.99; //0.94
  effectFocus.uniforms[ 'waveFactor' ].value = 0.003;  //0.00125

  var renderScene = new THREE.RenderPass( scene, camera );

  composer = new THREE.EffectComposer( renderer );
  composer.addPass( renderScene );
  composer.addPass( effectCopy );
  composer.addPass( effectFocus );

  effectFocus.renderToScreen = true;

  window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

  composer.reset();

}


document.addEventListener( 'mousemove', onDocumentMouseMove, false );


function onDocumentMouseMove( event ) {

  mouseX = event.clientX - windowHalfX;

  targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.001;

}


function animate() {

requestAnimationFrame( animate );
if (colorWheel.getFrequencyData() < 1 ){
  curve.xRadius = 35;
  curve.yRadius = 35;
} else{
  curve.xRadius = colorWheel.getFrequencyData();
  curve.yRadius = colorWheel.getFrequencyData();
}


render();

}

function render() {

delta = speed * clock.getDelta();

particleCloud.geometry.verticesNeedUpdate = true;

attributes.size.needsUpdate = true;
attributes.pcolor.needsUpdate = true;

group.rotation.y += ( targetRotation - group.rotation.y ) * 0.05;
// renderer.clear();

composer.render( 0.1 );

};

function ParticleRing() {

  this.context = new webkitAudioContext();
  this.analyser = this.context.createAnalyser();
  this.analyser.fftSize = 2048;
  this.setUpSource(song);
  this.bufferLength = this.analyser.frequencyBinCount;
  this.dataArray = new Uint8Array(this.bufferLength);
  averageFrequency = 1;

};

ParticleRing.prototype.setUpSource = function(audio) {
  this.source = this.context.createMediaElementSource(audio);
  this.source.connect(this.context.destination);
  this.source.connect(this.analyser);
};

ParticleRing.prototype.getFrequencyData = function() {
  this.analyser.getByteFrequencyData(this.dataArray);
  for(var i = 0; i < this.bufferLength; i++) {
    averageFrequency += this.dataArray[i];
  };
  //find average
  averageFrequency = averageFrequency / this.bufferLength;
  return averageFrequency;
};
