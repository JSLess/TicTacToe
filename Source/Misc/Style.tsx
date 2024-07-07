
export { Style }


function Style (
    css : TemplateStringsArray ,
    ... inserts : Array<any>
){

    const content = css
        .map(( value , index ) => value + ( inserts[ index ] ?? '' ) )
        .join('')

    const args = {
        dangerouslySetInnerHTML : {
            __html : content
        }
    }

    return () => <style { ... args } />
}
