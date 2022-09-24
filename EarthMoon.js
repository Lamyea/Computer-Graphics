window.addEventListener( 'load', init );

function init() {

  let width = 580
    , height = 410
    , rot = 0;


  /**
  * render
  **/
  const renderer = new THREE.WebGLRenderer( {
    canvas: document.querySelector( '#myCanvas' ),
    alpha: true
  } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( width, height );
  renderer.shadowMap.enabled = true;

  const scene = new THREE.Scene();
  const clock = new THREE.Clock();

  /**
  * camera
  **/
  const camera = new THREE.PerspectiveCamera( 45, width / height, 0.1, 10000 );
  camera.position.set( 400, 350, 5000 );

  /**
  * controls
  **/
  const controls = new THREE.OrbitControls(camera, document.body);
  
  
  /**
  * earth
  **/
  const e_Geometry = new THREE.SphereGeometry(150, 60, 60 );
  const e_texture = new THREE.TextureLoader().load('https://upload.wikimedia.org/wikipedia/commons/c/cf/WorldMap-A_non-Frame.png');
  const e_materials = new THREE.MeshStandardMaterial( { color: 0xaaaaaa, specular: 0x292929, shininess: 15, map:e_texture } );
  const earth = new THREE.Mesh(e_Geometry, e_materials );
  scene.add(earth);
  earth.receiveShadow = true;
  earth.castShadow = true;

  /**
  * moon
  **/
  const m_Geometry = new THREE.SphereGeometry( 40, 60, 60 );
  const m_texture = new THREE.TextureLoader().load('https://upload.wikimedia.org/wikipedia/commons/d/db/Moonmap_from_clementine_data.png');
  const m_materials = new THREE.MeshStandardMaterial( { color: 0xaaaaaa, specular: 0x292929, shininess: 12, map:m_texture } );
  const moon = new THREE.Mesh( m_Geometry, m_materials );
  scene.add(moon);





  /**
  * fragment
  **/
  createStarField();

  function createStarField() {
    const geometry = new THREE.SphereBufferGeometry(4, 3, 4),
          size = 1;
    for (let i = 0; i < 2000; i++) {
      const material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        flatShading: true
      })
    /*  const mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(size * Math.random() - 0.5, size * Math.random() - 0.5, size * Math.random() - 0.5).normalize()
      mesh.position.multiplyScalar(Math.random() * 800)
      mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2)
      mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 2
      scene.add(mesh)*/
    }
  }

  /**
  * light
  **/
  var light = new THREE.AmbientLight( 0x404040 )

  var light = new THREE.DirectionalLight( 0xffffff, 1, 100)
    light.position.set(100, 1, 100)
    light.castShadow = true; 
    light.shadowDarkness = 20;
    light.shadowCameraVisible=true;
    scene.add( light )


  animation();
    var a = 70;
    var b = 0;
    var c = 0.3 * Math.PI / 100;
  function animation() {
    rot += .5;
    renderer.render( scene, camera );



    /**
    * camera
    **/
    const radian = ( rot * Math.PI ) / 1000;          
    camera.position.x = 1000 * Math.sin( radian );
    camera.position.z = 1000 * Math.cos( radian );



    /**
    * moon
    **/
    const m_radian = ( rot * Math.PI ) / 100;
    moon.position.x = 300 * Math.sin( m_radian );
    moon.position.y = 0;
    moon.position.z = 300 * Math.cos( m_radian );



    /**
    * earth
    **/
    earth.rotation.x = 70;
    earth.position.y = 0;
    earth.rotation.z = 0.3 * ( Math.PI / 100 );



    camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );

    requestAnimationFrame( animation );
  }
}