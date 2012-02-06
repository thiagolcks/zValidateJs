(function ($) {
	'use strict';

	// Centraliza  um bloco na tela
	function zt_centralizar(conteudo) {
		var winH = $(window).height(),
			winW = $(window).width(),
			scrool_top = $(window).scrollTop();
		conteudo.css('top', (winH / 2 - conteudo.height() / 2) + scrool_top).css('left', winW / 2 - conteudo.width() / 2);
	}

	var methods = {
		lightbox: function (method, o) {
			var	mask = $('#mask'),
				link = $(this);

			o = $.extend({
				width: 960,
				conteudo: null, // Elemento que deverá ser exibido
				ajustarConteudo: function () { }
			}, o);

			if (mask.length === 0) {
				$('body').append("<div id='mask'></div>"); mask = $('#mask');
			}

			link.click(function (e) {
				var conteudo = $(o.conteudo),
					maskHeight = $(document).height(),
					maskWidth = $(window).width();

				e.preventDefault();

				conteudo.width(o.width);

				// Adiciona uma máscara para impedir clicks no restante do site
				mask.css({'width': maskWidth, 'height': maskHeight}).show();

				zt_centralizar(conteudo);

				o.ajustarConteudo(link, conteudo);

				conteudo.fadeIn(500);
			});
		},
		spambot: function () {
			var form = $(this),
				bt = form.find(':submit');
			bt.before("<div class='spambot'><input type='checkbox' value='1' name='spambot' id='spambot' class='no-width checkbox' /><label for='spambot'>Eu não sou um robô spammer</label></div>");
		}
	};


	// Botão de fechar do lightbox
	$('.window .close').click(function (e) {
		e.preventDefault();
		$('#mask, .window').hide();
	});

	// Centraliza o lightbox quando a janela é redimensionada
	$(window).resize(function () {
		zt_centralizar($('.window'));
	});

	$.fn.zt = function (method) {
		if (methods[method]) {
		    return methods[method].apply(this, arguments);
		} else {
			$.error('Método ' + method + ' não existe em jQuery.zt');
	    }
	};

}(jQuery));