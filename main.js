

//  == OutSide ==
const block1 = [[' ','#',' ',' '],[' ','#',' ',' '],[' ','#',' ',' '],[' ','#',' ',' ']];
const block2 = [[' ',' ','#',' '],[' ','#','#',' '],[' ','#',' ',' '],[' ',' ',' ',' ']];
const block3 = [[' ','#',' ',' '],[' ','#','#',' '],[' ',' ','#',' '],[' ',' ',' ',' ']];
const block4 = [[' ','#',' ',' '],[' ','#',' ',' '],[' ','#','#',' '],[' ',' ',' ',' ']];
const block5 = [[' ',' ','#',' '],[' ',' ','#',' '],[' ','#','#',' '],[' ',' ',' ',' ']];
const block6 = [[' ',' ',' ',' '],[' ','#','#',' '],[' ','#','#',' '],[' ',' ',' ',' ']];
const block7 = [[' ',' ',' ',' '],[' ','#',' ',' '],['#','#','#',' '],[' ',' ',' ',' ']];
const blocks = [block1,block2,block3,block4,block5,block6,block7];

function ran0_6()
{
    return Math.trunc(Math.random()*7);
}
function copy(martix)
{
    const res = [[],[],[],[]];
    for (let i = 0;i < 4;i++)
    {
        for (let j = 0;j < 4;j++)
        {
            res[i][j] = martix[i][j];
        }
    }
    return res;
}
function rotate(martix)
{
    const res = copy(martix);
    for (let i = 0;i < 4;i++)
    {
        for (let j = 0;j < 4;j++)
        {
            martix[j][3-i] = res[i][j];
        }
    }
}
function getRotated(martix)
{
    const res = copy(martix);
    rotate(res);
    return res;
}
//  == end OutSide ==


var activeblock = null;
var startY = 0;  //向下
var startX = 0;  //=====>   X

const map = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],['+','+','+','+','+','+','+','+','+','+','+','+','+','+']];
const HEIGHT = 18;
const WIDTH = 12;
for (let i = 0;i < HEIGHT;i++)
{
    map[i][0] = '+';
    for (let j = 1;j <= WIDTH;j++)
    {
        map[i][j] = ' ';
    }
    map[i][WIDTH + 1] = '+';
}
function generate()
{
    activeblock = null;
    activeblock = blocks[ran0_6()];
    startY = -3;
    startX = Math.trunc(WIDTH/2) - 2;
}
function Redraw()
{
    if (startY <= 0)
    {
        for (let i = 0;i < startY + 4;i++)
        {
            for (let j = startX - 1;j < startX + 5;j++)
            {
                if (map[i][j] === '#')
                {
                    map[i][j] = ' ';
                }
                if (j >= startX && j < startX + 4)
                {
                    if (map[i][j] === ' ')
                    {
                        map[i][j] = activeblock[i - startY][j - startX];
                    }
                }  
            }
        }
    }
    else
    {
        if (startY <= HEIGHT - 4)
        {
            for (let i = startY - 1;i < startY + 4;i++)
            {
                for (let j = startX - 1;j < startX + 5;j++)
                {
                    if (map[i][j] === '#')
                    {
                        map[i][j] = ' ';
                    }
                    if (i >= startY && j >= startX && j < startX + 4)
                    {
                        if (map[i][j] === ' ')
                        {
                            map[i][j] = activeblock[i - startY][j - startX];
                        }
                    } 
                }
            }
        }
        else
        {
            for (let i = startY - 1;i < HEIGHT;i++)
            {
                for (let j = startX - 1;j < startX + 5;j++)
                {
                    if (map[i][j] === '#')
                    {
                        map[i][j] = ' ';
                    }
                    if (i >= startY && j >= startX && j < startX + 4)
                    {
                        if (map[i][j] === ' ')
                        {
                            map[i][j] = activeblock[i - startY][j - startX];
                        }
                    } 
                }
            }
        }
    }
}
function putBlock()
{
    if (startY <= HEIGHT - 4)
    {
        for (let i = startY;i < startY + 4;i++)
        {
            for (let j = startX;j < startX + 4;j++)
            {
                if (map[i][j] === '#')
                {
                    map[i][j] = '%';
                }
            }
        }
    }
    else
    {
        for (let i = startY;i < HEIGHT;i++)
        {
            for (let j = startX;j < startX + 4;j++)
            {
                if (map[i][j] === '#')
                {
                    map[i][j] = '%';
                }
            }
        }
    }
}
function testImpact(position)
{
    /*
        position:
        0 - down
        1 - left
        2 - right
        3 - rotate
    */
    if (position === 0)
    {
        if (startY >= 0)
        {
            if (startY <= HEIGHT - 4)
            {
                for (let i = 3;i>=0;i--)
                {
                    for (let j = 0;j<4;j++)
                    {
                        if (activeblock[i][j] === '#' && (map[startY + i + 1][startX + j] === '+' || map[startY + i + 1][startX + j] === '%'))
                        {
                            return true;
                        }
                    }
                }
            }
            else
            {
                for (let i = HEIGHT - startY - 1;i >= 0;i--)
                {
                    for (let j = 0;j<4;j++)
                    {
                        if (activeblock[i][j] === '#' && (map[startY + i + 1][startX + j] === '+' || map[startY + i + 1][startX + j] === '%'))
                        {
                            return true;
                        }
                    }
                }
            }
        }
        else
        {
            for (let i = 3;i >= -startY;i--)
            {
                for (let j = 0;j<4;j++)
                {
                    if (activeblock[i][j] === '#' && (map[i+startY+1][startX + j] === '+' || map[i+startY+1][startX + j] === '%'))
                    {
                        return true;
                    }
                }
            }
        }
    }
    else if (position === 1)
    {
        if (startY >= 0)
        {
            if (startY <= HEIGHT - 4)
            {
                for (let j = 0;j < 4;j++)
                {
                    for (let i = 0;i < 4;i++)
                    {
                        if (activeblock[i][j] === '#' && (map[startY + i][startX + j - 1] === '+' || map[startY + i][startX + j - 1] === '%'))
                        {
                            return true;
                        }
                    }
                }
            }
            else
            {
                for (let j = 0;j < 4;j++)
                {
                    for (let i = HEIGHT - startY - 1;i >= 0;i--)
                    {
                        if (activeblock[i][j] === '#' && (map[startY + i][startX + j - 1] === '+' || map[startY + i][startX + j - 1] === '%'))
                        {
                            return true;
                        }
                    }
                }
            }
        }
        else
        {
            for (let j = 0;j < 4;j++)
            {
                for (let i = -startY;i < 4;i++)
                {
                    if (activeblock[i][j] === '#' && (map[i+startY][startX + j - 1] === '+' || map[i+startY][startX + j - 1] === '%'))
                    {
                        return true;
                    }
                }
            }
        }
    }
    else if (position === 2)
    {
        if (startY >= 0)
        {
            if (startY <= HEIGHT - 4)
            {
                for (let j = 3;j >= 0;j--)
                {
                    for (let i = 0;i < 4;i++)
                    {
                        if (activeblock[i][j] === '#' && (map[startY + i][startX + j + 1] === '+' || map[startY + i][startX + j + 1] === '%'))
                        {
                            return true;
                        }
                    }
                }
            }
            else
            {
                for (let j = 3;j >= 0;j--)
                {
                    for (let i = HEIGHT - startY - 1;i >= 0;i--)
                    {
                        if (activeblock[i][j] === '#' && (map[startY + i][startX + j + 1] === '+' || map[startY + i][startX + j + 1] === '%'))
                        {
                            return true;
                        }
                    }
                }
            }
        }
        else
        {
            for (let j = 3;j >= 0;j--)
            {
                for (let i = -startY;i < 4;i++)
                {
                    if (activeblock[i][j] === '#' && (map[i+startY][startX + j + 1] === '+' || map[i+startY][startX + j + 1] === '%'))
                    {
                        return true;
                    }
                }
            }
        }
    }
    else if (position === 3)
    {
        var rotated = getRotated(activeblock);
        if (startY >= 0)
        {
            if (startY <= HEIGHT - 4)
            {
                for (let i = 3;i>=0;i--)
                {
                    for (let j = 0;j<4;j++)
                    {
                        if (rotated[i][j] === '#' && (map[startY + i][startX + j] === '+' || map[startY + i][startX + j] === '%'))
                        {
                            return true;
                        }
                    }
                }
            }
            else
            {
                for (let i = HEIGHT - startY - 1;i >= 0;i--)
                {
                    for (let j = 0;j<4;j++)
                    {
                        if (rotated[i][j] === '#' && (map[startY + i][startX + j] === '+' || map[startY + i][startX + j] === '%'))
                        {
                            return true;
                        }
                    }
                }
            }
        }
        else
        {
            for (let i = 3;i >= -startY;i--)
            {
                for (let j = 0;j<4;j++)
                {
                    if (rotated[i][j] === '#' && (map[i+startY][startX + j] === '+' || map[i+startY][startX + j] === '%'))
                    {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}
function testLine()
{
    var eliminated = [];
    if (startY >= 0)
    {
        if(startY <= HEIGHT - 4)
        {
            OUT1:
            for (let i = startY + 3;i >= startY;i--)
            {
                for (let j = 1;j <= WIDTH;j++)
                {
                    if (map[i][j] !== '%')
                    {
                        continue OUT1;
                    } 
                }
                eliminated.push(i);
            }
        }
        else
        {
            OUT2:
            for (let i = HEIGHT - 1;i >= startY;i--)
            {
                for (let j = 1;j <= WIDTH;j++)
                {
                    if (map[i][j] !== '%')
                    {
                        continue OUT2;
                    }
                }
                eliminated.push(i);
            }
        }
    }
    else
    {
        OUT3:
        for (let i = -startY;i >= 0;i--)
        {
            for (let j = 1;j <= WIDTH;j++)
            {
                if (map[i][j] !== '%')
                {
                    continue OUT3;
                }
                eliminated.push(i);
            }
        }
    }
    return eliminated;
}
function handleLine(arr)
{
    if (arr.length === 0)
    {
        return;
    }
    var endLine = arr[0];
    for (let i = endLine;i >= arr.length;i--)
    {
        for (let j = 1;j <= WIDTH;j++)
        {
            map[i][j] = map[i-arr.length][j];
        }
    }
    for (let i = 0;i < arr.length;i++)
    {
        for (j = 1;j <= WIDTH;j++)
        {
            map[i][j] = ' ';
        }
    }
}