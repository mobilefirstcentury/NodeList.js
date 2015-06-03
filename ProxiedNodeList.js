(function() {
	var NL = {
		forEach: Array.prototype.forEach,
		entries: Array.prototype.entries,
		keys: Array.prototype.keys,
		indexOf: Array.prototype.indexOf,
		lastIndexOf: Array.prototype.lastIndexOf,
		every: Array.prototype.every,
		some: Array.prototype.some,
		reduce: Array.prototype.reduce,
		reduceRight: Array.prototype.reduceRight,
		slice(begin, end) {
			return Object.setPrototypeOf(Array.prototype.slice.call(this, begin, end), this);
		},
		filter(cb) {
			return Object.setPrototypeOf(Array.prototype.filter.call(this, cb), this);
		},
		includes(element) {
			return Array.prototype.slice.call(this).indexOf(element) > -1;
		},
		get(prop) {
			var arr = [];
			for(var element of this) arr.push(element[prop]);
			return arr;
		},
		set(prop, value) {
			for(var element of this) element[prop] = value;
		},
		map(cb) {
			var nodes    = Array.prototype.map.call(this, cb);
			var allNodes = nodes.every(function(el) {
				return el instanceof Node;
			});
			if(allNodes) nodes.__proto__ = this;
			return nodes;
		},
		concat() {
			var nodes = new Set(Array.prototype.slice.call(this));
			for(var arg of arguments) {
				if(arg instanceof Node) {
					nodes.add(arg);
				} else if(arg instanceof NodeList || arg instanceof HTMLCollection || arg instanceof Array) {
					for(var el of arg) {
						if(el instanceof Node) {
							nodes.add(el);
						} else if(el instanceof NodeList) {
							for(var a of el) nodes.add(a);
						} else {
							throw Error(`${el.constructor.name}: ${el} is not a Node`);
						}
					}
				} else {
					throw Error('Only Node, NodeList, HTMLCollection, or Array');
				}
			}
			return Object.setPrototypeOf([...nodes], this);
		}
	}

	document.querySelectorAll = function(selector) {
		var nodes = Document.prototype.querySelectorAll.call(document, selector);
		nodes = Array.prototype.slice.call(nodes); // done because once I set __proto__ on next line adding Symbol.iterator doesn't work in FireFox
		nodes.__proto__ = NL;
		nodes[Symbol.iterator] = Array.prototype[Symbol.iterator];
		return new Proxy(nodes, {
			get(target, property) {
				if(target[property]) return target[property];
				if(property in HTMLElement.prototype) {
					var arr = [], newNodes = new Set();
					for(var element of target) {
						var prop = element[property];
						prop instanceof Node ? newNodes.add(prop) : arr.push(prop);
					}
					return (target.size) ?
					Object.setPrototypeOf([...target], NL) :
					(arr[0] instanceof NodeList || arr[0] instanceof HTMLCollection) ?
					flatten(arr) : arr;
				}
			},
			set(target, prop, value) {
				for(var element of target) {
					if(prop in element) element[prop] = value;
				}
			}
		});
	}
})();
