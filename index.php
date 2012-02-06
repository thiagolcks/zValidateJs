<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
	<title></title>
	<style type="text/css">
		.requerido { border:1px solid #FF0000 }
		p.requerido { border:none; color:#ff0000; margin:0 0 5px }
	</style>
</head>
<body>
	
	<form id="contato-form" action="post.php" >
	
		<label for="nome">Nome</label><br />
		<input type="text" id="nome" name="nome" /><br />
		
		<label for="email">Email</label><br />
		<input type="text" id="email" name="email" /><br />
		
		<label for="telefone">Telefone</label><br />
		<input type="text" id="telefone" name="telefone" /><br />
		
		<label for="mensagem">Mensagem</label><br />
		<textarea name="mensagem" id="mensagem" cols="30" rows="10"></textarea>
		
		<div class="msgs"></div>
		
		<div class="botao-enviar">
			<button class="enviar-btn final" type="submit">Enviar</button>
		</div>
		
	</form>
	
	<script type="text/javascript" src="js/jquery-1.4.2.min.js"></script>
	<script type="text/javascript" src="js/validator.js"></script>
	<script type="text/javascript">
		$(document).ready(function(){
			paginaContato($);
		});
	</script>
</body>
</html>