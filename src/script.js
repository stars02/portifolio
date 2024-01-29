var OwnerId = "1068374487550152754"; // Seu ID do discord, lembre-se de entrar no server (https://discord.gg/lanyard)
var activity;

$.ajax({
url: "https://api.lanyard.rest/v1/users/" + OwnerId,
type: "GET",
beforeSend: function() {
  $('#name strong').text('loading...');
  $('#tagline strong').text('loading...');
},

success: function(res) {
  var data = res.data;
  activity = data.activities && data.activities.length > 0 ? data.activities[0] : null;

  $(".discord-status").removeAttr("style"); // Seu status (Online, idle, dnd ou offline)
  $(".discord-status").addClass(data.discord_status);

  if (data && data.discord_user) {
    $('#name strong').text(data.discord_user.display_name); // Seu nome global
    $('#tagline strong').text(data.discord_user.username); // Seu username

    $('#profile-picture').html('<img src="https://cdn.discordapp.com/avatars/' + data.discord_user.id + '/' + data.discord_user.avatar + '.png" alt="Avatar">'); // Seu avatar
    $('#banner').css('background-image', 'url(https://dcdn.dstn.to/banners/' + OwnerId + ')'); // Seu banner do perfil (caso tenha nitro gaming)

  } else {
    console.error('Dados inválidos na resposta da API.');
  }
},
error: function() {
  console.error('Erro na requisição AJAX.');
}
});