const { useState, useEffect, useRef } = React;
const { render } = ReactDOM;

class Application extends L.Evented {
	map = null;
	layer = null;

	select(layer) {
		this.selected = layer;
		this.fire("layer", { layer });
	}

	onLayerClick = (e) => {
		const layer = e.target;
		this.select(layer);
	};
}

// the application instance.
let app = null;

const App = () => {
	const [ready, setReady] = useState(false);
	const [_app] = useState(() => {
		return new Application();
	});

	app = _app;

	useEffect(() => {
		return () => {
			app = null;
		};
	}, []);

	return (
		<React.Fragment>
			<Scene onReady={setReady} />
			{ready ? (
				<React.Fragment>
					<Create />
					<Information />
        </React.Fragment>
			) : (
				<div>loading...</div>
			)}
		</React.Fragment>
	);
};

const Create = () => {
	const createMarker = () => {
		L.marker([0, 0], { draggable: true })
			.addTo(app.map)
			.on("mousedown", app.onLayerClick);
	};

	return (
		<div>
			<button onClick={createMarker}>create a marker</button>
		</div>
	);
};

const Information = () => {
	const [layer, setLayer] = useState();

	useEffect(() => {
		const onlayer = ({ layer }) => {
			setLayer(layer);
		};

		app.on("layer", onlayer);

		return () => {
			app.off("layer", onlayer);
		};
	}, []);

	const isMarker = layer instanceof L.Marker;

	return (
		<div className="Information">
			{isMarker && <Information.Marker key={layer._leaflet_id} layer={layer} />}
		</div>
	);
};

Information.Marker = ({ layer }) => {
	const [latlng, setLatlng] = useState(() => layer.getLatLng());

	useEffect(() => {
		const ondrag = (e) => {
			setLatlng(e.latlng);
		};

		layer.on("drag", ondrag);
		return () => {
			layer.off("drag", ondrag);
		};
	}, []);

	return (
		<div>
			ID, {layer._leaflet_id}; location: {latlng.lat},{latlng.lng}
		</div>
	);
};

const Scene = ({ onReady }) => {
	const div = useRef(null);

	useEffect(() => {
		const map = L.map(div.current, { center: [0, 0], zoom: 0 });

		L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
			maxZoom: 19,
			attribution:
				'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		}).addTo(map);

		app.map = map;
		onReady(true);

		return () => {
			app.map = null;
		};
	}, []);

	return <div className="Scene" ref={div} />;
};

render(<App />, document.querySelector("#root"));
