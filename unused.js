// In this file are stored parts of code that are not used (I wrote new or better version)

// ----------------------------------------------------------------------------------------------------
// Torus

const geometry_torus = new THREE.TorusGeometry(8, 2, 8, 30);
const material_torus = new THREE.MeshBasicMaterial({color: 0xff6347, wireframe: true});
const torus = new THREE.Mesh(geometry_torus, material_torus);

scene.add(torus);

// ----------------------------------------------------------------------------------------------------
// Creating circle and rotating it to the wall position (without moving)

function create_circle(x, y, z, rotation)
{
	// Circle
	const geometry_circle = new THREE.CircleGeometry(0.5, 16);
	const edges_circle = new THREE.EdgesGeometry(geometry_circle);
	const circle = new THREE.LineSegments(edges_circle, new THREE.LineBasicMaterial({color: 0xaaaaff}));
	circle.position.set(x, y, z);
	if (rotation == 1)						    // left right wall
		circle.rotation.y += 1.57079633;		// == 90 degrees
	else if (rotation == 2)					    // top bottom wall
		circle.rotation.x += 1.57079633;
	scene.add(circle);
}

// ----------------------------------------------------------------------------------------------------
// Example of creating a group

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
const cubeA = new THREE.Mesh(geometry, material);
cubeA.position.set(0, 0, 2);
const cubeB = new THREE.Mesh(geometry, material);
cubeB.position.set(0, 0, -1);
const group = new THREE.Group();
group.add(cubeA, cubeB);
scene.add(group);
group.position.set(0, 0, 0);

// ----------------------------------------------------------------------------------------------------
// Render loop

function animate()
{
	requestAnimationFrame(animate);

	//torus.rotation.x += 0.01;
	//torus.rotation.y += 0.005;
	//torus.rotation.z += 0.01;

	renderer.render(scene, camera);
}
animate();