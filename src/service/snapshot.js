console.log( "=== simpread snapshot load ===" )

let startPos, endPos, dragStart = false, position;

function start() {
    const dtd = $.Deferred();
    dragStart = false;
    $( ".simpread-read-root" ).append( `<simpread-snapshot><sr-mask></sr-mask></simpread-snapshot>` );
    $( "simpread-snapshot" )
        .on( "mousemove", event => {
            if ( dragStart == false ) {
            } else {
                endPos       = { left: event.clientX, top: event.clientY };
                const width  = endPos.left - startPos.left,
                      height = endPos.top  - startPos.top;
                position     = {
                    left  : width  >= 0 ? startPos.left : endPos.left,
                    top   : height >= 0 ? startPos.top  : endPos.top,
                    width : Math.abs( width ),
                    height: Math.abs( height ),
                }
                $( event.currentTarget ).find( "sr-mask" ).css( position );
            }
        })
        .on( "mousedown", event => {
            startPos  = { left: event.clientX, top: event.clientY };
            dragStart = true;
        })
        .on( "mouseup", event =>{
            dragStart = false;
            dtd.resolve( position );
        });
    return dtd;
}

function remove() {
    $( ".simpread-read-root" ).find( "simpread-snapshot" ).remove();
}

export {
    start  as Start,
    remove as End,
}