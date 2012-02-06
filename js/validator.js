/**
 * Define o formulário que será validado, e seus respectivos blocos de mensagem
 * 
 * @param form Id do formulário
 */
var Validator = function (form, options) {
	var instance = this;
	this.options = jQuery.extend({
		mode: 'oneMsg',
		msg_aguarde: 'Enviando a mensagem...',
		msg_pre_erro: 'Atenção, não esqueça de preencher: '
	}, options);
	this.campos = '';
	this.errors = 0;
	this.campos_check = [];
	if (typeof form == 'string')
		form = jQuery(form);
	this.form = form;
	this.msgs = this.form.find('.msgs');
	var propriedade = 'check';
	this.form.submit(function (e) {
		e.preventDefault();
		if (! instance.validate()) {
			return;
		}
		jQuery.post(form.attr('action'), form.serialize(), function (ret) {
			ret = jQuery.parseJson(ret);
			instance.informaSucesso().limpaForm();
		});
	});
	return this;
};

Validator.prototype.addCheck = function(campo) {
	campo = jQuery.extend({
		min: 3,
		msg: "Campo obrigatório!"
	}, campo);
	this.campos_check.push(campo);
	return this;
}

/**
 * Checa determinado campo
 * 
 * @param {String} id Id do elemento a ser validado
 * @param {String} label Label que deverá aparece em caso de erro
 * @param {Integer} length Quantidade mínima de caracteres esperado
 * @param {String} tipo Tipo do campo a ser validado - nome, email, checkbox
 * @param {String} padrao Valor padrão do campo
 */
Validator.prototype.check = function (campo_infos) {
	var campo = jQuery('#' + campo_infos.id),
		valor = jQuery.trim(campo.val()),
		erro = false,
		sobrenome = "",
		verificador = "";
	campo.val(valor);

	if (valor.length < campo_infos.min || valor === campo_infos.padrao) {
		erro = this.addError(campo, campo_infos);
	} else if (typeof campo_infos.tipo !== 'undefined') {
		verificador = 'is' + campo_infos.tipo;
		if (typeof this[verificador] === 'function' && ! this[verificador](campo)) {
			erro = this.addError(campo, campos_info);
		}
	}

	if (erro == false) {
		campo.removeClass('requerido');
	} else {
		switch (this.options.mode) {
		case 'multiMsgs':
			break;
		default:
			this.campos += erro;
		}
	}

	return this;
};

Validator.prototype.addError = function (campo, campo_infos) {
	this.errors += 1;
	switch (this.options.mode) {
	case 'multiMsgs':
		campo.addClass('requerido');
		campo.after("<p class='requerido'>" + campo_infos.msg + "</p>");
		return true;
		break;
	default: // oneMsg
		campo.addClass('requerido');
		return campo_infos.label + ', ';
	}
}

/**
 * Faz a validação
 * 
 * @return {Bool} O resultado da validação
 */
Validator.prototype.validate = function () {
	this.errors = 0;
	this.limpaMsgs();
	
	for (var i = 0,total = this.campos_check.length; i < total; i += 1) {
		this.check(this.campos_check[i]);
	}
	var msg = this.campos.substr(0, this.campos.length - 2).replace(/,([a-zA-Z ]+)$/, ' e $1');

	if (this.errors === 0) {
		this.msgs.addClass('enviando').html(this.options.msg_aguarde).show();
		return true;
	} else {
		switch (this.options.mode) {
		case 'multiMsgs': break;
		default:
			this.msgs.addClass('msg-erro').html(this.options.msg_pre_erro + msg).show();
			this.campos = '';
		}
		return false;
	}
};

/**
 * Limpa o campo de mensagens
 */
Validator.prototype.limpaMsgs = function () {
	this.msgs
		.removeClass('msg-erro')
		.removeClass('msg-sucesso')
		.removeClass('msg-enviando')
		.hide();
	jQuery('p.requerido').remove();
};

/**
 * Valida e-mail
 * 
 * @param email string
 * @return {Bool} O resultado da validação
 */
Validator.prototype.isEmail = function (campo) {
	var email = campo.val(),
		er = /^[a-zA-Z0-9][a-zA-Z0-9\._\-]+@([a-zA-Z0-9\._\-]+\.)[a-zA-Z-0-9]{2}/;
	
	if (er.exec(email)) {
		return true;
	} else {
		return false;
	}
};

/**
 * Valida nome completo
 * 
 * @param campo object
 * @return {Bool} O resultado da validação
 */
Validator.prototype.isNome = function (campo) {
	var valor = campo.val();
	// Se não tiver espaço
	if (valor.substr(valor.search(' ')).length < 2) {
		return false;
	} else {
		return true;
	}
};

/**
 * Valida checkbox
 * 
 * @param campo object
 * @return {Bool} O resultado da validação
 */
Validator.prototype.isCheckbox = function (campo) {
	if (campo.is(':checked')) {
		return true;
	} else {
		return false;
	}
};

/**
 * Reseta todos os campos do formulário selecionado
 */
Validator.prototype.limpaForm = function () {
	jQuery(':input', this.form)
		.not(':button, :submit, :reset, :hidden', ':radio', ':checkbox')
		.val('')
		.removeAttr('selected');
	jQuery(':checkbox, :radio', this.form).removeAttr('checked');
};


/**
 * Informa ao usuário que o formulário foi enviado corretamente
 * 
 * @param {String} Mensagem para o usuário
 */
Validator.prototype.informaSucesso = function (msg) {
	msg = typeof msg === 'undefined'  ? 'Obrigado! Sua mensagem foi enviada com sucesso, e em breve entraremos em contato com você.' : msg 	;
	this.limpaMsgs();
	this.msgs.html(msg).show();
	return this;
};



// Página de contato
function paginaContato($) {
	val = new Validator('#contato-form', {mode:'multiMsgs'})
		.addCheck({id:'nome', label:'nome completo', tipo:'Nome'})
		.addCheck({id:'email', label:'e-mail', tipo:'Email'})
	    .addCheck({id:'mensagem', label:'mensagem', min:7});
	//val.check('spambot', 'verificador de spammer', 0, 'checkbox');
}