"use strict";

/* -----------------------------------------------
/* Author : Matteo Bruni - www.matteobruni.it
/* MIT license: https://opensource.org/licenses/MIT
/* Demo / Generator : https://tsparticles.matteobruni.it/demo
/* GitHub : https://www.github.com/matteobruni/tsparticles
/* How to use? : Check the GitHub README
/* v1.7.1
/* ----------------------------------------------- */
import {Container} from "./Classes/Container";
import {Loader} from "./Classes/Loader";
import {IOptions} from "./Interfaces/Options/IOptions";
import {IParticlesJs} from "./Interfaces/IParticlesJs";
import {ParticlesJS} from "./support";

declare global {
    interface Window {
        requestAnimFrame: (callback: FrameRequestCallback) => number;
        mozRequestAnimationFrame: (callback: FrameRequestCallback) => number;
        oRequestAnimationFrame: (callback: FrameRequestCallback) => number;
        msRequestAnimationFrame: (callback: FrameRequestCallback) => number;
        cancelRequestAnimFrame: (handle: number) => void;
        webkitCancelRequestAnimationFrame: (handle: number) => void;
        mozCancelRequestAnimationFrame: (handle: number) => void;
        oCancelRequestAnimationFrame: (handle: number) => void;
        msCancelRequestAnimationFrame: (handle: number) => void;
        particlesJS: IParticlesJs;
        tsParticles: Main;
        pJSDom: () => Container[];
    }
}

/* ---------- global functions - vendors ------------ */

window.requestAnimFrame = (() => {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        ((callback) => window.setTimeout(callback, 1000 / 60));
})();

window.cancelRequestAnimFrame = (() => {
    return window.cancelAnimationFrame ||
        window.webkitCancelRequestAnimationFrame ||
        window.mozCancelRequestAnimationFrame ||
        window.oCancelRequestAnimationFrame ||
        window.msCancelRequestAnimationFrame ||
        clearTimeout
})();

/* ---------- tsParticles functions - start ------------ */

/**
 * Main class for creating the singleton on window.
 * It's a proxy to the static [[Loader]] class
 */
class Main {
    /**
     * Loads an options object from the provided array to create a [[Container]] object.
     * @param tagId the particles container element id
     * @param params the options array to get the item from
     * @param index if provided gets the corresponding item from the array
     */
    public loadFromArray(tagId: string, params: IOptions[], index?: number): Container | undefined {
        return Loader.loadFromArray(tagId, params, index);
    }

    /**
     * Loads the provided options to create a [[Container]] object.
     * @param tagId the particles container element id
     * @param params the options object to initialize the [[Container]]
     */
    public load(tagId: string, params: IOptions): Container | undefined {
        return Loader.load(tagId, params);
    }

    /**
     * Loads the provided json with a GET request. The content will be used to create a [[Container]] object.
     * This method is async, so if you need a callback refer to JavaScript function `fetch`
     * @param tagId the particles container element id
     * @param pathConfigJson the json path to use in the GET request
     */
    public loadJSON(tagId: string, pathConfigJson: string): Promise<Container | undefined> {
        return Loader.loadJSON(tagId, pathConfigJson);
    }

    /**
     * Adds an additional click handler to all the loaded [[Container]] objects.
     * @param callback the function called after the click event is fired
     */
    public setOnClickHandler(callback: EventListenerOrEventListenerObject): void {
        Loader.setOnClickHandler(callback);
    }

    /**
     * All the [[Container]] objects loaded
     */
    public dom(): Container[] {
        return Loader.dom();
    }

    /**
     * Retrieves a [[Container]] from all the objects loaded
     * @param index the object index
     */
    public domItem(index: number): Container {
        return Loader.domItem(index);
    }
}

/**
 * The new singleton, replacing the old particlesJS
 */
window.tsParticles = new Main();

Object.freeze(window.tsParticles);

/* particles.js compatibility */

/**
 * Loads the provided options to create a [[Container]] object.
 * @deprecated this method is obsolete, please use the new tsParticles.load
 * @param tagId the particles container element id
 * @param params the options object to initialize the [[Container]]
 */
window.particlesJS = (tagId: string, params: IOptions) => ParticlesJS.load(tagId, params);

/**
 * Loads the provided json with a GET request. The content will be used to create a [[Container]] object.
 * @deprecated this method is obsolete, please use the new tsParticles.loadJSON
 * @param tagId the particles container element id
 * @param pathConfigJson the json path to use in the GET request
 * @param callback the function called after the [[Container]] object is loaded that will be passed as a parameter
 */
window.particlesJS.load = (tagId: string, pathConfigJson: string, callback: (container: Container) => void) =>
    ParticlesJS.loadJson(tagId, pathConfigJson, callback);

/**
 * Adds an additional click handler to all the loaded [[Container]] objects.
 * @deprecated this method is obsolete, please use the new tsParticles.setOnClickHandler
 * @param callback the function called after the click event is fired
 */
window.particlesJS.setOnClickHandler = (callback: EventListenerOrEventListenerObject) =>
    ParticlesJS.setOnClickHandler(callback);

/**
 * All the [[Container]] objects loaded
 * @deprecated this method is obsolete, please use the new tsParticles.dom
 */
window.pJSDom = () => {
    if (console) {
        console.warn("this method is obsolete, please use the new tsParticles.dom");
    }

    return window.tsParticles.dom();
};
