(function () {
	'use strict';

	// Página de contato
	function contato($) {
		var form = $('#contato-form');
		form.zt('spambot');
		form.submit(function (e) {
			e.preventDefault();
			jQuery('#contato-form .msg-enviada').hide();
			jQuery('#contato-form .msg-erro').hide();
			jQuery('#contato-form .irequerido').removeClass('irequerido');
			if (!contato_validar()) {
				return;
			}
			jQuery('#contato-form .msg-enviando').show();
			jQuery.post(form.attr('action'), form.serialize(), function (ret) {
				$('#contato-form .msg-enviando').hide();
				$('#contato-form .msg-enviada').show();
				limpar_form('#contato-form');
			});
		});

	}


	function contato_validar() {
		var campos  = "",
			msg;
		campos += validar('nome', 'nome completo', 5);
		campos += validar('email', 'e-mail', 5, 'email');
		campos += validar('mensagem', 'mensagem', 7, null);
		campos += validar('spambot', 'verificador de spammer', 0, 'checkbox');
		msg = campos.substr(0, campos.length - 2).replace(/,([a-zA-Z ]+)$/, ' e $1');
		jQuery('#contato-form div.msg-erro').find('span.campos').html(msg);
		if (campos.length === 0) {
			return true;
		} else {
			jQuery('#contato-form  div.msg-erro').show();
		}
	}


	function validar(id, label, length, tipo, padrao) {
		var campo = jQuery('#' + id),
			valor = campo.val(),
			ret = "";

		campo.val(jQuery.trim(valor));

		if (valor.length < length || valor === padrao) {
			campo.addClass('irequerido');
			ret = "" + label + ', ';
		} else if (tipo === 'nome') {
			// Se não tiver espaço
			if (valor.search(' ') == -1) {
				campo.addClass('irequerido');
				ret = "" + label + ', ';
			} else {
				sobrenome = valor.substr(jQuery.trim(valor.search(' ')));
				if (sobrenome.length < 2) {
					campo.addClass('irequerido');
					ret = "" + label + ', ';
				}
			}
		} else if (tipo === 'email') {
			if (!valida_email(campo.val())) {
				campo.addClass('irequerido');
				ret = "" + label + ', ';
			}
		} else if (tipo === 'checkbox') {
			if (jQuery('#' + id + ':checked').length === 0) {
				campo.addClass('irequerido');
				ret = "" + label + ', ';
			}
		} 
		return ret;
	}


	function valida_email(email) {
		var er = /^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z-0-9]{2}/;
		if (er.exec(email)) {
			return true;
		} else {
			return false;
		}
	}


	function limpar_form(context) {
		jQuery(':input', context)
		 .not(':button, :submit, :reset, :hidden')
		 .val('')
		 .removeAttr('checked')
		 .removeAttr('selected');
	}


	function galerias( ) {
		jQuery('.gallery').each(function(i,e) {
			var gal = jQuery(e);
			jQuery('a', gal).each(function(i2,e) {
				jQuery(e).attr('rel', 'gal[num' + i + ']');
			});
			jQuery('[rel^="gal[num' + i + ']"]').prettyPhoto({show_title: false});
		});
	}

	function fancybox_galerias( ) {
		jQuery('.gallery').each(function(i, e){
			gal = jQuery(e);
			jQuery('a', gal).each(function(i2, e){
				jQuery(e).attr('rel', 'gal-' + i + '');
			});
		});
		jQuery('div.gallery a').fancybox({titlePosition: 'over', overlayColor: '#000'});
		jQuery('a.gal').live('click', function(){ jQuery.fancybox({titlePosition: 'over', overlayColor: '#000', 'href': this.href}); });
	}

	var map;

	function mapa() {
		var latlng = new google.maps.LatLng(map_center[0], map_center[1]),
			myOptions = {
				zoom: map_zoom,
				center: latlng,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
		map = new google.maps.Map(document.getElementById("googlemaps"), myOptions);
	}


	// Add markers to the map
	function setMarkers(map, locations) {
		for (var i = 0, total=locations.length; i < total; i+=1) {
		    var local = locations[i],
		    	myLatLng = new google.maps.LatLng(local[1], local[2]),
		    	image = new google.maps.MarkerImage(local[3],
		  	      // This marker is 20 pixels wide by 32 pixels tall.
		  	      new google.maps.Size(local[4][0], local[4][1]),
		  	      // The origin for this image is 0,0.
		  	      new google.maps.Point(local[5][0],local[5][1]),
		  	      // The anchor for this image is the base of the flagpole at 0,32.
		  	      new google.maps.Point(local[6][0] ,local[6][1])),
		  	      marker = new google.maps.Marker({
		  	    	  position: myLatLng,
		  	    	  map: map,
		  	    	  icon: image,
		  	    	  title: local[0],
		  	    	  zIndex: i
		  	      });
		  }
	}

}())