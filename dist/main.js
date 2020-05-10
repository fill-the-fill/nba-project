
class Renderer {
    render(data) {
        const source = $("#player-template").html()
        const template = Handlebars.compile(source)
        const newHTML = template({player: data});
        $('#container').empty();
        $('#container').append(newHTML);
    }
}
const rend = new Renderer

  
$('#findTeam').on('click', () => {
    const input = $('#teamNameInput').val()

        $.get(`/teams/${input}`, function(result) {
        rend.render(result) 
    })
})
