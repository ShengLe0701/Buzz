/* @flow */
'use strict';
import 'whatwg-fetch';
import urlServices from '../data/urlServices';
import LocalStorage from './LocalStorage'

//import RNFetchBlob from 'react-native-fetch-blob'
//import NativeModules from 'react-native-image-to-base64'


const serverURL = process.env.SERVER_URL;

class APIService {


	static fetchGetPostList(idUsuario){
		return new Promise((resolve, reject) => {
			fetch(serverURL+urlServices.getPostList+idUsuario).then((response) => {
				return response.json()
			}).then((json) => {
				resolve(json);
			}).catch((ex) => {
				reject(ex)
			})
    });
	}

	static fetchGetCategoryList(idCetegoryio){
		return new Promise((resolve, reject) => {
				fetch(serverURL+urlServices.getCategoryList+idCetegoryio).then((response) => {
						return response.json()
				}).then((json) => {
					resolve(json);
				}).catch((ex) => {
					reject(ex)
				})
    });
	}	
	
	static fetchAddPost(postData){
			return new Promise(function(resolve, reject) {
					fetch(serverURL+urlServices.addPost, {
							method: 'POST',
							headers: {
								'Accept': 'application/json',
								'Content-Type': 'application/json'
							},
							body: JSON.stringify(postData)
					}).then((response) => {
							return response.json()
					}).then((returnData) => {
							resolve(returnData);
					}).catch((ex) => {
							reject(ex)
					})
			});
	}	

	static fetchUpdatePost(postData){
			return new Promise(function(resolve, reject) {
					fetch(serverURL+urlServices.addPost, {
							method: 'POST',
							headers: {
								'Accept': 'application/json',
								'Content-Type': 'application/json'
							},
							body: JSON.stringify(postData)
					}).then((response) => {
							return response.json()
					}).then((returnData) => {
							resolve(returnData);
					}).catch((ex) => {
							reject(ex)
					})
			});
	}	

	static fetchUploadImageBase64(imageData) {
			return new Promise(function(resolve, reject) {
					fetch(serverURL+urlServices.uploadImageBase64, {
							method: 'POST',
							headers: {
								'Accept': 'application/json',
								'Content-Type': 'application/json'
							},
							body: JSON.stringify(imageData)
					}).then((response) => {
							return response.json()
					}).then((returnData) => {
							resolve(returnData);
					}).catch((ex) => {
							reject(ex)
					})
			});
		
	}

	static fetchPost(slug){
		console.log('fetchPost')
		let geo = LocalStorage.getObject('geolocalizacao')
		let slugObj = {
			slug: slug
		}
		let obj = Object.assign({}, geo, slugObj)
		console.log(JSON.stringify(obj))
		return new Promise((resolve, reject) => {
      fetch(serverURL+urlServices.post, {
				method: 'POST',
	      headers: {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json'
	      },
	      body: JSON.stringify(obj)
			}).then((response) => {
        return response.json()
      }).then((json) => {
				// console.log(json)
				resolve(json);
      }).catch((ex) => {
        reject(ex)
      })
    });
	}

	static fetchAssuntos(){
		return new Promise((resolve, reject) => {
      fetch(serverURL+urlServices.assuntos+'/8').then((response) => {
        return response.json()
      }).then((json) => {
				resolve(json);
      }).catch((ex) => {
        reject(ex)
      })
    });
	}

	static fetchTopBuzzpagers(){
		return new Promise((resolve, reject) => {
      fetch(serverURL+urlServices.topBuzzpagers).then((response) => {
        return response.json()
      }).then((json) => {
				resolve(json);
      }).catch((ex) => {
        reject(ex)
      })
    });
	}

	static buscarRegioes(){
		return new Promise((resolve,reject) => {
      fetch(serverURL+urlServices.regioes).then((response) => {
        return response.json()
      }).then((json) => {
				resolve(json);
      }).catch((ex) => {
        reject(ex)
      })
    });
	}

	static extratoPost(idUsuario){
		// console.log('extratoPost')
		// console.log(serverURL+urlServices.extratoPost+idUsuario)
		return new Promise((resolve,reject) => {
			fetch(serverURL+urlServices.extratoPost+idUsuario).then((response) => {
				return response.json()
			}).then((json) => {
				resolve(json);
			}).catch((ex) => {
				reject(ex)
			})
		});
	}

	static extratoIndicacoes(idUsuario){
		// console.log('extratoIndicacoes')
		// console.log(serverURL+urlServices.extratoIndicacoes+idUsuario)
		return new Promise((resolve,reject) => {
			fetch(serverURL+urlServices.extratoIndicacoes+idUsuario).then((response) => {
				return response.json()
			}).then((json) => {
				console.log(json)
				resolve(json);
			}).catch((ex) => {
				reject(ex)
			})
		});
	}

	static extratoIndicacoesEmpresas(idUsuario){
		// console.log('extratoIndicacoesEmpresas')
		// console.log(serverURL+urlServices.extratoIndicacoesEmpresas+idUsuario)
		return new Promise((resolve,reject) => {
			fetch(serverURL+urlServices.extratoIndicacoesEmpresas+idUsuario).then((response) => {
				return response.json()
			}).then((json) => {
				console.log(json)
				resolve(json);
			}).catch((ex) => {
				reject(ex)
			})
		});
	}

	static verificaEmailCadastrado(email){
		return new Promise((resolve, reject) => {
      fetch(serverURL+urlServices.buscaEmail+email).then((response) => {
        return response.json()
      }).then((json) => {
				resolve(json);
      }).catch((ex) => {
        reject(ex)
      })
    });
	}

	static cadastrarConta(usuario){
		return new Promise(function(resolve, reject) {
			fetch(serverURL+urlServices.cadastro, {
	      method: 'POST',
	      headers: {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json'
	      },
	      body: JSON.stringify(usuario)
	    }).then((response) => {
				return response.json()
	    }).then((cadastro) => {
		      if(cadastro.login){
		        resolve(cadastro);
		      } else {
						reject(false)
					}
			}).catch((ex) => {
        reject(ex)
      })
		});
	}

	static contatoUsuario(contato){
		return new Promise(function(resolve) {
			fetch(serverURL+urlServices.contatos, {
				method:'POST',
				headers:{
					'Accept':'application/json',
					'Content-Type':'application/json'
				},
				body:JSON.stringify(contato)
			}).then((resp) => {
				// console.log('fetch contatoUsuario then')
				// console.log(resp)
				resolve(resp);
			})
		});
	}

	static fetchUltimosPosts(quantidade, offset){
		return new Promise((resolve) => {
      fetch(serverURL+urlServices.ultimosPosts+quantidade+'/'+offset).then((response) => {
        return response.json()
      }).then((json) => {
        resolve(json)
      }).catch((ex) => {
        console.log('parsing failed', ex)
      })
		});
	}

	static fetchPostsCategoria(slug, quantidade, offset){
		let geo = LocalStorage.getObject('geolocalizacao')
		let slugObj = {
			slug: slug,
			qtdeRegistros: quantidade,
			offSet: offset
		}
		let obj = Object.assign({}, geo, slugObj)
		console.log(JSON.stringify(obj))
		return new Promise((resolve, reject) => {
			fetch(serverURL+urlServices.buscaPostCategoria, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(obj)
			}).then((response) => {
				return response.json()
			}).then((json) => {
				resolve(json);
			}).catch((ex) => {
				reject(ex)
			})
		});
	}

	static fetchMelhoresPosts(quantidade){
		return new Promise((resolve) => {
      fetch(serverURL+urlServices.melhoresPosts+quantidade).then((response) => {
        return response.json()
      }).then((json) => {
				console.log(json)
        resolve(json)
      }).catch((ex) => {
        console.log('parsing failed', ex)
      })
		});
	}

	static fetchPesquisa(quantidade, offset, params){
		return new Promise((resolve) => {
			if(params != ''){
				fetch(serverURL+urlServices.pesquisa+params+'/'+quantidade+'/'+offset).then((response) => {
					return response.json()
				}).then((json) => {
					console.log('pesquisa json')
					console.log(json)
					resolve(json)
				}).catch((ex) => {
					console.log('parsing failed', ex)
				})
			}
		});
	}

	static fetchUser(login){
		return new Promise((resolve) => {
				fetch(serverURL+urlServices.profile+login).then((response) => {
					return response.json()
				}).then((json) => {
					resolve(json)
				}).catch((ex) => {
					console.log('parsing failed', ex)
				})
		});
	}

	static fetchRecomendacoes(id){
		return new Promise((resolve) => {
				fetch(serverURL+urlServices.recomendacoes+id).then((response) => {
					return response.json()
				}).then((json) => {
					resolve(json)
				}).catch((ex) => {
					console.log('parsing failed', ex)
				})
		});
	}

	static esqueciMinhaSenha(email){
		return new Promise((resolve) => {
			fetch(serverURL+urlServices.esqueciSenha, {
	      method: 'POST',
	      headers: {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json'
	      },
	      body: JSON.stringify(email)}).then((response) => {
					return response.json()
				}).then((json) => {
	      console.log('esqueciMinhaSenha then')
	      console.log(json)
        resolve(json)
	    })
		})
	}

	static postarComentario(comentario){
		return new Promise((resolve) => {
			fetch(serverURL+urlServices.comentario, {
	      method: 'POST',
	      headers: {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json'
	      },
	      body: JSON.stringify(comentario)}).then((response) => {
					return response.json()
				}).then((json) => {
        resolve(json)
	    })
		})
	}

	static deletarComentario(idComentario){
		return new Promise((resolve) => {
			fetch(serverURL+urlServices.comentario+idComentario, {
	      method: 'DELETE'}).then((response) => {
					return response.json()
	    }).then((json) => {
				resolve(json)
			})
		})
	}

	static checkLiked(idPessoa, idPost){
		return new Promise((resolve) => {
				fetch(serverURL+urlServices.curtidas+idPessoa+'/'+idPost, {method: 'GET'}).then(function(response) {
			    return response.json()
			  }).then(function(json) {
					resolve(json)
			  }).catch(function(ex) {
			    console.log('parsing failed', ex)
			  })
		});
	}

	static postLike(idPessoa, idPost){
		return new Promise((resolve) => {
				fetch(serverURL+urlServices.curtidas+idPessoa+'/'+idPost, {method: 'POST'}).then(function(response) {
			    return response.json()
			  }).then(function(json) {
					console.log('checkLiked then')
					console.log(json)
					resolve(json)
			  }).catch(function(ex) {
			    console.log('parsing failed', ex)
			  })
		});
	}

	static getClientIP(){
		return new Promise((resolve) => {
				fetch(urlServices.checkIP).then(function(response) {
			    return response.json()
			  }).then(function(json) {
					resolve(json.ip)
			  }).catch(function(ex) {
			    console.log('parsing failed', ex)
			  })
		});
	}

	static userLogin(user){
		return new Promise((resolve, reject) => {
			fetch(serverURL+urlServices.login, {
	      method: 'POST',
	      headers: {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json'
	      },
	      body: JSON.stringify(user)}).then((response) => {
					return response.json()
				}).then((json) => {
	      if(json.idPessoa != 0){
	        resolve(json);
	      } else {
					reject(json)
				}
	    }).catch((ex) => {
				console.log(ex)
        reject(ex)
      })
		});
	}

	static userFacebookLogin(facebookUser){
		console.log('userFacebookLogin')
		let obj = {
			accessToken: facebookUser.accessToken
		}
		console.log(JSON.stringify(obj))
		return new Promise((resolve, reject) => {
			fetch(serverURL+urlServices.loginFacebook, {
	      method: 'POST',
	      headers: {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json'
	      },
	      body: JSON.stringify(obj)}).then((response) => {
					return response.json()
				}).then((json) => {
					resolve(json, facebookUser);
	    }).catch((ex) => {
				console.log(ex)
        reject(ex)
      })
		});
	}

}

export default APIService
