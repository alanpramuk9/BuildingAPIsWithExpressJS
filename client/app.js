$(document).ready(function(){
    $('#post').on("click", () => {
        let userinput = $('#user').val();
        let textinput = $('#text').val();
         $.ajax({
            method: 'POST',
            url: '/api/chirps',
            dataType:'json',
            data: ({
                user: userinput,
                text: textinput
            })
        }).done(function(data){
            console.log(data);
            console.log('great success');
        })  
    })
    
    $('#load').click(function(){
        $.ajax({
            method: 'GET',
            url: '/api/chirps',
            dataType:'json'
        }).done(function(data){
            let chirps = data;
            let keys = Object.keys(chirps);
            for(let key of keys){
                if (key != "nextid"){   
                    $('#chirps').append(`<div class="chirpRows" id='t${key}'>${chirps[key].text}
                    <button type="button" class="btn btn-success" data-toggle="modal" id="s${key}" data-target="#myModal">My Model</button>
                    <button class='btn btn-primary' id="b${key}">X</button></div>`);
                    $(`#b${key}`).on("click", () => { 
                        $.ajax({
                            type: 'DELETE',
                            url: `/api/chirps/${key}`,
                        }).then((r) => {
                            console.log('success!');
                            $(`#t${key}`).remove();
                        }).catch((err) => {
                            console.log(err);
                        });
                    });
                    $(`#s${key}`).on('click', () => {
                        $('.modal-body').html(`<input id="y${key}"></input>`);
                        console.log(`${chirps[key].text}`);
                        console.log(`y${key}`);
                        $('.modal-footer').html(`<button id="z${key}" type="button" class="btn btn-default" data-dismiss="modal">Save Changes</button>`);
                        $(`#z${key}`).on("click", () => {
                            let changeText = $(`#y${key}`).val();
                            $.ajax({    
                                method: 'PUT',
                                url: `/api/chirps/${key}`,
                                dataType:'json',
                                data: ({
                                    text: changeText
                                })
                            }).done((r) => {
                                console.log('success!');
                            }).fail((err) => {
                                console.log(err);
                            });
                        });
                    });
                }
            }
        });
    })  
});
