<template>
    <div class="page">
        <vue-topprogress ref="topProgress"></vue-topprogress>
        <smm_navbar pageName="photo-measuring"/>
        <div class="page-patient-details page-container pb-0">
            <div :class="overlay"></div>
            <div class="container">
                <div class="row m-0">
                    <div class="col d-flex flex-column  align-items-center position-relative">
                        <div class="mt-4" v-show="!isHide">
                            <video ref="video" class="w-100" id="video" width="640" height="480" autoplay></video>
                        </div>
                        <img v-show="isHide" ref="image" class="mt-4 w-100" :src="captures"/>
                        <img class="hide-img" id="hide-img" src="../../assets/pixelated.jpg">
                        <canvas ref="canvas" id="canvas" width="640" height="480"></canvas>
                        <div>
                            <div class="round-button p-0">
                                <div class="next submit-button">
                                    <button v-if="!isHide" type="button" @click="capture">Click</button>
                                    <button v-else class="done" type="button" @click="goBack">Done</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div>
                    <b-modal ref="myModalRef" class="text-dark text-center" hide-footer
                             title="Message">
                        <div class="d-block text-center text-dark">
                            <h3>{{message}}</h3>
                        </div>
                        <b-button class="mt-3 ml-auto mr-auto btn w-25 text-center text-danger modal-button"
                                  variant="outline-danger"
                                  block @click="hideModal">{{buttonText}}
                        </b-button>
                    </b-modal>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import smm_navbar from '../navbar.vue';
    import {endPoints} from "../../api/endpoints";
    import {saveData} from "../../provider/savedataMixin";
    import {saveMethods} from "../../provider/saveMethod";

    export default {
        name: "image_view",
        components: {
            smm_navbar
        },
        data() {
            return {
                video: {},
                canvas: {},
                captures: "",
                isHide: false,
                context: '',
                blurImage: '',
                side: 'side',
                userType: '',
                message: 'Unable to detect facial recognition, Please retake image to blur the eyes',
                photo: null,
                stream: '',
                hasUserMedia: false,
                overlay:'',
                buttonText: ''
            }
        },
        mounted() {
            this.video = this.$refs.video;
            /*if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia({video: true}).then(stream => {
                    // console.log("stream: ", window.URL);
                    this.video.srcObject  = stream;
                    this.video.play();
                });
            }*/


            navigator.getUserMedia = (navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia ||
                navigator.msGetUserMedia ||
                navigator.oGetUserMedia);

            // new api for video and audio called navigator.mediadevices
            // for new browsers video can directly consume MediaStream using srcObject
            //
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices
                    .getUserMedia({video: true})
                    .then(stream => {
                        this.video = this.$refs.video; // reInitializing as it doesn't work sometime.
                        this.video.srcObject = stream;
                        this.stream = stream;
                        this.hasUserMedia = true;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            } else if (navigator.getUserMedia) {
                // if new api not there, use the old one
                navigator.getUserMedia(
                    {video: true},
                    stream => {
                        this.video = this.$refs.video;
                        // below line won't work on new browser because of this
                        // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL#Using_object_URLs_for_media_streams
                        // this.src = window.URL.createObjectURL(stream);
                        this.video.srcObject = stream;
                        this.stream = stream;
                        this.hasUserMedia = true;
                    },
                    error => {
                        console.log(error);
                    }
                );
            }else{
                this.buttonText = "Close";
                this.message= 'Your browser is not support webcam';
            }

        },
        methods: {
            capture() {
                this.canvas = this.$refs.canvas;
                this.context = this.canvas.getContext("2d").drawImage(this.video, 0, 0, 640, 480);
                this.captures = canvas.toDataURL("image/png");
                this.isHide = true;
                this.$refs.topProgress.start();
                this.overlay = 'add-overlay';
                this.getCords(this.captures);
            },
            async getCords(img) {
                let axiosConfig = {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                };

                let sentImage = {image: img};
                await fetch(endPoints.baseUrl + endPoints.getimage, {
                    method: 'post',
                    headers: axiosConfig,
                    body: JSON.stringify(sentImage)
                }).then(response => {
                    return response.json();
                }).then((data) => {
                    this.setPixlate(data);
                })
                    .catch((error) => {
                        console.log('Request failed', error);
                         this.message= 'This request has been blocked; the content must be served over HTTPS';
                         this.buttonText = "Done";
                          this.overlay = 'remove-overlay';
                          this.$refs.topProgress.done();
                          this.$refs.myModalRef.show();
                    });
            },

            take_photo() {
                this.photo = this.$refs.webcam.getPhoto();
            },

            setPixlate(obj) {
                if (obj.cords.length) {
                    var eye_cords = obj.cords;

                    let img = this.$refs.image;

                    let imgHeight = img.height;
                    let imgWidth = img.width;

                    var hideImage = document.getElementById('hide-img').getAttribute('src');
                    this.blurImage = new Image();
                    this.blurImage.src = `${hideImage}`;

                    let canvasImg = this.$refs.canvas;
                    let contextImg = canvasImg.getContext("2d");
                    contextImg.drawImage(img, 0, 0, imgWidth, imgHeight);

                    let x, y, width, height;
                    for (var key in eye_cords) {
                        if (this.side === "front") {
                            if (eye_cords[key].left_eye.width > 0) {
                                x = eye_cords[key].left_eye.left_of_left_eyebrow.x;
                                y = (eye_cords[key].left_eye.right_of_left_eyebrow.y - 15);
                                width = (eye_cords[key].right_eye.right_of_right_eyebrow.x - eye_cords[key].left_eye.left_of_left_eyebrow.x);
                                height = eye_cords[key].left_eye.width;
                                this.drawBlurImage(contextImg, x, y, width, height);
                            }
                            if (eye_cords[key].nose.width_left > 0) {
                                x = (eye_cords[key].mouth.mouth_center.x + 10);
                                y = ((eye_cords[key].between_eye.y + (eye_cords[key].left_eye.width / 2)) - 10);
                                width = ((eye_cords[key].mouth.width_right + 15)) ;
                                height = ((eye_cords[key].mouth.mouth_center.y - eye_cords[key].between_eye.y));
                                this.drawBlurImage(contextImg, x, y, width, height);
                            }
                            if (eye_cords[key].nose.width_left > 0) {
                                x = ((eye_cords[key].mouth.mouth_center.x - eye_cords[key].mouth.width_right) - 10);
                                y = ((eye_cords[key].between_eye.y + (eye_cords[key].left_eye.width / 2)) - 10);
                                width = ((eye_cords[key].mouth.width_right + 20));
                                height = ((eye_cords[key].mouth.mouth_center.y - eye_cords[key].between_eye.y));
                                this.drawBlurImage(contextImg, x, y, width, height);
                            }
                        } else {
                            if (eye_cords[key].left_eye.width > 0) {
                                x = eye_cords[key].left_eye.left_of_left_eyebrow.x;
                                y = (eye_cords[key].left_eye.right_of_left_eyebrow.y - 30);
                                width = (eye_cords[key].nose.nose_tip.x - eye_cords[key].left_eye.left_of_left_eyebrow.x);
                                height = ((eye_cords[key].mouth.mouth_center.y - eye_cords[key].left_eye.right_of_left_eyebrow.y) + 70);
                                this.drawBlurImage(contextImg, x, y, width, height);
                            }
                            if (eye_cords[key].right_eye.width > 0) {
                                x = ((eye_cords[key].right_eye.left_of_right_eyebrow.x - (eye_cords[key].nose.nose_tip.x - eye_cords[key].right_eye.right_of_right_eyebrow.x)) - 20);
                                y = (eye_cords[key].right_eye.right_of_right_eyebrow.y - 30) ;
                                width = (eye_cords[key].nose.nose_tip.x - eye_cords[key].right_eye.right_of_right_eyebrow.x);
                                height = ((eye_cords[key].mouth.mouth_center.y - eye_cords[key].right_eye.right_of_right_eyebrow.y) + 70);
                                this.drawBlurImage(contextImg, x, y, width, height);
                            }
                        }
                    }
                    setTimeout(() => {
                        let canvasData = canvasImg.toDataURL('image/jpeg', 1.0);
                        this.captures = canvasData;
                        if (this.userType === 'adult') {
                            let position = this.side === 'front' ? 'frontImage' : 'sideImage';
                            saveMethods.validateForm(position, 'adult');
                            this.side === 'front' ? saveMethods.adult.frontImage(canvasData)
                                : saveMethods.adult.sideImage(canvasData);
                        } else {
                            saveMethods.validateForm('frontImage', 'kid');

                        }
                        this.$refs.topProgress.done();
                        this.overlay = 'remove-overlay';
                    }, 1000);
                } else {
                    this.$refs.topProgress.done();
                    this.overlay = 'remove-overlay';
                    this.message= 'Unable to detect facial recognition, Please retake image to blur the eyes';
                    this.$refs.myModalRef.show();
                    this.isHide = false;
                    this.buttonText = "Retake";
                }
            },

            drawBlurImage(context, x, y, w, h) {
                setTimeout(() => {
                    context.drawImage(this.blurImage, x, y, w, h);
                }, 1000);
            },

            goBack() {
                this.$router.go(-2);
            },
            hideModal() {
                this.$refs.myModalRef.hide()
            }
        },
        created() {
            let data = JSON.parse(saveMethods.getLocalStorage('userType'));
            this.userType = data ? data.userType : '';
            this.side = saveData.imagePosition;
        }
    }
</script>

<style lang="scss" scoped>
    .page {
        text-align: center;
        color: #2c3e50;
    }

    #video {
        background-color: #000000;
    }

    #canvas {
        display: none;
    }

    li {
        display: inline;
        padding: 5px;
    }

    .hide-img {
        position: absolute;
        z-index: -100;
        height: 0;
        width: 0;
    }

    .round-button button {
        font-size: 23px !important;
        padding: 27px 20px !important;
        &.done {
            padding: 26px 16px !important;
        }
    }
    @media screen and (-ms-high-contrast: active), screen and (-ms-high-contrast: none) {
        .round-button button {
            padding: 27px 17px !important;
        }
    }
</style>
