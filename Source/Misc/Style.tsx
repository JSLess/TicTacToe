
export { Style }


function Style (
    css : TemplateStringsArray
){

    const args = {
        dangerouslySetInnerHTML : {
            __html : css[0]
        }
    }

    return () => <style { ... args } />
}
