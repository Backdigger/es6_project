
class MyWindow extends EventEmitter {
    constructor(options) {
        super();



        this.box = document.createElement("div");
        this.box.className = 'modal-window__block';
        this.box.style.top = (options.top || 20) + 'px';
        this.box.style.left = (options.left || 30) + 'px';
        this.box.style.width = (options.width || 400) + 'px';
        this.box.style.height = (options.height || 200) + 'px';
        this.box.classList.add(options.style || 'classic');


        this.iFrameSrc = options.src || 'http://www.tut.by';
        this._initHtmlStructure();
        this._addEventListeners();
        this.resizer = document.createElement('div');
        this.resizer.className = 'resizer';
        this.resizer.style.width = '10px';
        this.resizer.style.height = '10px';
        this.resizer.style.position = 'absolute';
        this.resizer.style.right = 0;
        this.resizer.style.bottom = 0;
        this.resizer.style.cursor = 'se-resize';
        this.box.appendChild(this.resizer);
        this.resizer.addEventListener('mousedown', () => { this.initResize() }, true);


        this.resize = this._resize.bind(this);
        this.stopResize = this._stopResize.bind(this);

        window.currentBox = null;
        window.isDown = false;
        window.offsetX = 0;
        window.offsetY = 0;
        window.addEventListener('mouseup', this.windowMouseUp, false);
        this.box.addEventListener('mousedown', this.boxMouseDown, false);

    }


    _initHtmlStructure() {
        this.box.innerHTML = "<div class='modal-window__header'><button class='modal-window__button'></button></div>"
                           + "<div class='sun-cont'><iframe src='" + this.iFrameSrc + "'></iframe></div>";
    }

    _addEventListeners() {
        this.box.querySelector('.modal-window__button').addEventListener('click', () => { this.close() });
    }

    setStyle(style) {
        this.style = this.box.classList.add(style);
    }

    initResize(e)
    {
        window.addEventListener('mousemove', this.resize, false);
        window.addEventListener('mouseup', this.stopResize, false);

    }
    _resize(e)
    {

        this.box.style.width = (e.clientX - this.box.offsetLeft) + 'px';
        this.box.style.height = (e.clientY - this.box.offsetTop) + 'px';
    }
    _stopResize(e)
    {
        window.removeEventListener('mousemove', this.resize, false);
        window.removeEventListener('mouseup', this.stopResize, false);
    }

    windowMouseUp(e) {
        if (window.isDown) {
            window.isDown = false;
            window.currentBox.style.top = (e.clientY - window.offsetY) + 'px';
            window.currentBox.style.left = (e.clientX - window.offsetX) + 'px';
        }
        // else {
        //     window.removeEventListener('mousemove', this.resize, false);
        //     window.removeEventListener('mouseup', this.stopResize, false);
        // }
        e.preventDefault();
    }
    boxMouseDown(e) {
        if (!window.isDown && e.target.className === 'modal-window__header') {
            window.isDown = true;
            window.offsetX = e.offsetX;
            window.offsetY = e.offsetY;
            window.currentBox = e.target.parentNode;

        }

        //else if (e.target.className === 'resizer') {


            // e.target.parentNode.style.width +=  e.clientX - e.target.parentNode.style.width;
            // e.target.parentNode.style.height +=  e.clientY - e.target.parentNode.style.height;

        //}
        e.preventDefault();
    }
    setPosition(top, left) {
        this.emit('position', [{top: this.box.style.top, left: this.box.style.left}, {top: top, left: left}]);
        this.box.style.top = top + 'px';
        this.box.style.left = left + 'px';


    }

    getPosition() {
        return {
            top: this.box.style.top,
            left: this.box.style.left

        }
    }

    show() {
        document.body.appendChild(this.box);
        this.emit('show');
    }

    close() {

        this.box.parentNode.removeChild(this.box);
        this.emit('close');
    }

    remove() {
        this.close();
        this.removeAllListeners();
        this.emit('remove');

    }

    setSize(width, height) {
        this.box.style.width = width + 'px';
        this.box.style.height = height + 'px';

    }

    getSize() {
        return {
            width: parseInt(this.box.style.width),
            height: parseInt(this.box.style.height)

        }
    }



}


var v1 = new MyWindow({
    top: 20,
    left: 20,
    width: 400,
    height: 400,
    style: 'classic',
    src: 'http://wikipedia.org'
});


v1.show();

v1.addListener('close', () => {
    alert("Fall asleep");
});

v1.addListener('show', () => {
    alert("It's alive!");
});

v1.addListener('remove', () => {
    alert("All listeners gone");
});

v1.addListener('position', ([oldPosition, newPosition]) => {console.log(newPosition);});




