import './style.css'
import * as THREE from 'three'

// Configuring the scene

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 3000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  antialiasing: true,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.set(10, 10, 20);
camera.lookAt(0, 0, 0);

// Plane

const geo = new THREE.SphereGeometry(0.05, 32, 16);
const mat = new THREE.MeshBasicMaterial({color: 0xffffff});
const pbot = new THREE.Mesh(geo, mat);
const pleft = new THREE.Mesh(geo, mat);
const pback = new THREE.Mesh(geo, mat);
pleft.position.set(-5, 0, 0);
pbot.position.set(0, -5, 0);
pback.position.set(0, 0, -5);
scene.add(pbot, pleft, pback);

const gridHelpx = new THREE.GridHelper(10, 10, 0x0000ff);
const gridHelpy = new THREE.GridHelper(10, 10, 0x00ff00);
const gridHelpz = new THREE.GridHelper(10, 10, 0xff0000);
gridHelpx.position.set(0, -5, 0);
gridHelpy.position.set(-5, 0, 0);
gridHelpz.position.set(0, 0, -5);
gridHelpy.rotation.z = 1.57079633;
gridHelpz.rotation.x = 1.57079633
scene.add(gridHelpx, gridHelpy, gridHelpz);

// ----------------------------------------------------------------------------------------------------

// Point

const geometry_point = new THREE.BufferGeometry();
const material_point = new THREE.PointsMaterial({color: 0x00ff00});
const point = new THREE.Points(geometry_point, material_point);
let point_x = 3;
let point_y = 1;
let point_z = -2;
point.position.set(point_x, point_y, point_z);
scene.add(point);

// ----------------------------------------------------------------------------------------------------

function create_box(x, y, z)
{
	// Box
	const geometry_box = new THREE.BoxGeometry(1, 1, 1);
	const edges_box = new THREE.EdgesGeometry (geometry_box);
	const box = new THREE.LineSegments (edges_box, new THREE.LineBasicMaterial({color: 0x2345ff}));
	box.position.set(x, y, z);
	box.lookAt(point_x, point_y, point_z);
	scene.add(box);
}

// ----------------------------------------------------------------------------------------------------

// Creating boxes as group

function constructGroup(x, y, z)
{
	// Box
	const geometry_box = new THREE.BoxGeometry(1, 1, 1);
	const edges_box = new THREE.EdgesGeometry (geometry_box);
	const box = new THREE.LineSegments (edges_box, new THREE.LineBasicMaterial({color: 0x2345ff}));
	box.position.set(0, 0, 0);
	
	// Circles - i know it's ugly, but it works! :D
	const geometry_circle = new THREE.CircleGeometry(0.5, 16);
	const edges_circle = new THREE.EdgesGeometry(geometry_circle);
	const circle1 = new THREE.LineSegments(edges_circle, new THREE.LineBasicMaterial({color: 0xaaaaff}));
	const circle2 = new THREE.LineSegments(edges_circle, new THREE.LineBasicMaterial({color: 0xaaaaff}));
	const circle3 = new THREE.LineSegments(edges_circle, new THREE.LineBasicMaterial({color: 0xaaaaff}));
	const circle4 = new THREE.LineSegments(edges_circle, new THREE.LineBasicMaterial({color: 0xaaaaff}));
	const circle5 = new THREE.LineSegments(edges_circle, new THREE.LineBasicMaterial({color: 0xaaaaff}));
	const circle6 = new THREE.LineSegments(edges_circle, new THREE.LineBasicMaterial({color: 0xaaaaff}));
	circle1.position.set(0.5, 0, 0);		// right
	circle2.position.set(-0.5, 0, 0);		// left
	circle3.position.set(0, 0.5, 0);		// front
	circle4.position.set(0, -0.5, 0);		// back
	circle5.position.set(0, 0, 0.5);		// top
	circle6.position.set(0, 0, -0.5);		// back
	circle1.rotation.y += 1.57079633;
	circle2.rotation.y += 1.57079633;
	circle3.rotation.x += 1.57079633;
	circle4.rotation.x += 1.57079633;
	circle5.rotation.z += 1.57079633;
	circle6.rotation.z += 1.57079633;
	
	const group = new THREE.Group();
	group.add(box, circle1, circle2, circle3, circle4, circle5, circle6);
	group.position.set(x, y, z);
	group.lookAt(point_x, point_y, point_z);
	scene.add(group);
}

// ----------------------------------------------------------------------------------------------------

// Adding the vector to show the position of point

const vector = new THREE.Vector3(point.position.x, point.position.y, point.position.z);
vector.normalize();
const origin = new THREE.Vector3(0, 0, 0);
const arrowHelper = new THREE.ArrowHelper(vector, origin, 1, 0xff0000);
scene.add(arrowHelper);

let n = 0;
while (n < 5)
{
	constructGroup(origin.getComponent(0), origin.getComponent(1), origin.getComponent(2));
	origin.add(vector);
	n++;
}

// ----------------------------------------------------------------------------------------------------

// Render

renderer.render(scene, camera);