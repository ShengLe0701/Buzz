/* @flow */
'use strict';

class LocalStorage {

	static clearUsuario(){
		localStorage.removeItem('usuario')
		let fb = localStorage.getItem('facebookUser')
		if(fb){
			LocalStorage.removeItem('facebookUser')
		}
	}

	static clearRegiao(){
		localStorage.removeItem('geolocalizacao')
		localStorage.removeItem('askedRegiao')
	}

	static setObject(key, value){
		let stringify = JSON.stringify(value);
		localStorage.setItem(key, stringify)
	}

	static getObject(key){
		let get = localStorage.getItem(key)
		// console.log(key)
		// console.log(localStorage.getItem(key))
		if(get){
			return JSON.parse(get)
		} else {
			return null
		}
	}
}

export default LocalStorage
