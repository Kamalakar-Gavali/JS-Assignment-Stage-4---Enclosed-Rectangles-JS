//rec = {
//	top: '25px',
//	left: '96px',
//	width: '64px',
//	height: '96px'
//}

function updateStructure(rec1, rec2){
	//write your code
	if(contains(rec1, rec2)) {
		const relativeDim = relative(rec1, rec2);
		return{ ...rec1, children: [relativeDim] };
	} else if(contains(rec2, rec1)) {
		const relativeDim = relative(rec2, rec1);
		return{ ...rec2, children: [relativeDim] };
	} else {
		return { ...rec1 };
	}
}

function relative(rec1, rec2) {
	const rec1n = normalize(rec1);
	const rec2n = normalize(rec2);

	const rec = {
		children: rec2.children
	}

	if(rec2.top) 
		rec.top = `${rec2n.x1 - rec1n.x1}px`;

	if(rec2.left)
		rec.left = `${rec2n.y1 - rec1n.y1}px`;

	if(rec2.height)
		rec.height = rec2.height;
	
	if(rec2.width)
		rec.width = rec2.width;
	
	if(rec2.bottom) 
		rec.bottom = `${rec1n.x2 - rec2n.x2}px`;

	if(rec2.right)
		rec.right = `${rec1n.y2 - rec2n.y2}px`;

	return rec;	
	
}

function contains(rec1, rec2) {
	const rec1n = normalize(rec1);
	const rec2n = normalize(rec2);

	if(rec1n.x1 <= rec2n.x1 && rec1n.y1 <= rec2n.y1 && rec1n.x2 >= rec2n.x2 && rec1n.y2 >= rec2n.y2)
		return true;

	return false;
}

const T = 100000;
const W = 100000;

function normalize(rec) {
	return {
		x1: rec.top ? parseInt(rec.top) : (T - (parseInt(rec.bottom) + parseInt(rec.height))),
		y1: rec.left ? parseInt(rec.left) : (W - (parseInt(rec.right) + parseInt(rec.width))),
		x2: rec.bottom ? (T - parseInt(rec.bottom)) : (parseInt(rec.top) + parseInt(rec.height)),
		y2: rec.right ? (W - parseInt(rec.right)) : (parseInt(rec.left) + parseInt(rec.width))
	};
}

module.exports = updateStructure;
