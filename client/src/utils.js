export let flatten2D = function(x, y, width){
    return y * width + x;
}

export let pushSet = function(arr, x, y, low, high, max_w, max_h){
    let x_plus_low = x + low < max_w;
    let x_plus_high = x + high < max_w;
    let x_minus_low = x - low >= 0;
    let x_minus_high = x - high >= 0;

    let y_plus_low = y + low < max_h;
    let y_plus_high = y + high < max_h;
    let y_minus_low = y - low >= 0;
    let y_minus_high = y - high >= 0;

    if( x_plus_low && y_plus_high ){
        arr.push( flatten2D(x+low, y+high, max_w) );
    }
    if( x_minus_low && y_minus_high ){
        arr.push( flatten2D(x-low, y-high, max_w) );
    }

    if(low !== 0){
        if( x_plus_low && y_minus_high ){
            arr.push( flatten2D(x+low, y-high, max_w) );
        }
        if( x_minus_low && y_plus_high ){
            arr.push( flatten2D(x-low, y+high, max_w) );
        }
    }
    

    if(low !== high){
        if( x_plus_high && y_plus_low ){
            arr.push( flatten2D(x+high, y+low, max_w) );
        }
        if( x_minus_high && y_minus_low ){
            arr.push( flatten2D(x-high, y-low, max_w) );
        }
        if( x_plus_high && y_minus_low ){
            arr.push( flatten2D(x+high, y-low, max_w) );
        }
        if( x_minus_high && y_plus_low ){
            arr.push( flatten2D(x-high, y+low, max_w) );
        }
    }

    return arr;
}