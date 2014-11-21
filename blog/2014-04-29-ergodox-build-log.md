---
title: "Ergodox Build Log"
layout: "post"
date: "2014-04-29 02:17:00"
description: 
tags: [keyboard, ergodox]
---


For anyone how hasn’t heard of the [Ergodox keyboard](http://ergodox.org/) it represents the state of the art in keyboard technology, at least if you don’t care about having a mini OLED screen embedded in each key. The Ergodox has 3 qualities that make it a keyboard unique: it’s physically separated into two halves, it adds new keys to form two distinct thumb clusters (similar to the [Kinesis](http://www.kinesis-ergo.com/shop/advantage-for-pc-mac/)), and its design is fully open source. All of these qualities combine to form a keyboard that is great for someone who regularly sits in front of a computer long enough to figure out how to actually build one -- it’s ergonomically sound and every key is reprogrammable. I ordered one off of [Massdrop](https://www.massdrop.com/home); here’s how I built it:


The components arrived in a box unassembled and cushioned by bubble wrap. I opted for the cherry MX blue switches and the extended palm rest for this build. Although I would have preferred brown switches, supply issues made is so that those weren't an option in the particular drop I participated in and I wasn't in the mood to source switched myself. Besides, if I was going to assemble the keyboard anyways, I figured I could always unassembled it later (or just buy a new one).

<img border="0" src="http://2.bp.blogspot.com/-7gGV__dd9IY/U1782TM65lI/AAAAAAAAAVY/8IY4pPeEAOE/s1600/IMG_20140225_193902.jpg" height="320" width="240">

<img border="0" src="http://3.bp.blogspot.com/-Y3eCchocE3A/U1786Gqxj_I/AAAAAAAAAVg/VmYW5qXoAmc/s1600/IMG_20140225_194000.jpg" height="240" width="320">

<img border="0" src="http://3.bp.blogspot.com/--P0TUjesEy0/U1786czSrxI/AAAAAAAAAVo/4ELRN29VtJM/s1600/IMG_20140227_215522.jpg" height="240" width="320">

Because the build was going to require a good amount of soldering, I opted to splurge a little bit on a decent soldering iron. I picked up a Weller WES51with adjustable temperature for around $80 on Amazon and a generic solder sucker for the occasional screwup. Because this build requires soldering surface mount diodes, I highly recommend using a quality rig and if you can get a fine solder tip, that's even better.

<img border="0" src="http://1.bp.blogspot.com/-koxGLpIjPFk/U1787Ru2O6I/AAAAAAAAAV4/5OxWYNbfu28/s1600/IMG_20140428_171950.jpg" height="240" width="320">


The build began by soldering on a few resistors, headers, the headphone TRRS jacks, and the Teensey micro-controller that serves as the brains of the keyboard. The Ergodox PCB is designed such that both halves are actually copies of the same PCB so one arbitrary choice later, I was happily on my way to a semi-populated board. The kit contained two mini-B cables, one for connecting the keyboard to the computer, and another for connecting the Teensy micro-controller to the PCB. In order to accomplish the second task, the cable had to be cannibalized so the connector would fit into the casing. Doing so proved to be the most difficult (and dangerous) part of the entire build. I opted to slowly whittle away at the insulation with a sharp knife, however, I have heard that a Dremel is the most effective method.

!(http://1.bp.blogspot.com/-koxGLpIjPFk/U1787Ru2O6I/AAAAAAAAAV4/5OxWYNbfu28/s1600/IMG_20140428_171950.jpg)


<img border="0" src="http://3.bp.blogspot.com/-5rSK1lHs0HY/U1786biMsUI/AAAAAAAAAVk/dllqd4LC7bc/s1600/IMG_20140301_152137.jpg" height="300" width="400">


The next part is probably the part most people have trouble with. The plans call for surface mount diodes to be painfully soldered next to each switch on the PCB. Needle tweezers are a must in this situation and I found it easiest to place a small dab of solder on one of the pads, then hold the diode over the pad while re-melting the solder and moving the diode into the proper position.  Solder flux would have been very helpful in this situation however, I did not have any on hand so I opted to charge ahead without it. During this step, it's absolutely important to ensure that each diode is **facing the proper direction** . Failing to do so will render the keyboard inoperable and you will have to go back and correct each incorrect diode. For this build, the tiny grey stipe on the diode should be facing the square pad.


The next step is to begin mounting each switch onto acrylic frame. Because the switches included in this kit are of the plate mounted kinda, as opposed to the PCB mounted types, this step must be done before soldering them on the board.  This also means that if you want to change the case, you will have to desolder every switch in order to fully liberate the PCB. These plate mounted switches tend to be more durable than the alternatives, so that's a win for stability, still, it makes me sad that once you continue past this step, you're locked into using the original acrylic case.


I found it best to mount and solder each of the corner switches first before filling in the middle. This makes it easier to line up the switches with their respective holes. After this step is finished, be sure to inspect your work and make sure every lead has enough solder on it and no [solder bridges](https://learn.adafruit.com/adafruit-guide-excellent-soldering/common-problems) exist that could short circuit your keyboard. At this point, you should be able to connect the two halves of the keyboard and plug it into your computer.  You'll have to flash the Teensy with the appropriate firmware but after doing that, you should have a fully functioning keyboard, all that's left is to finish assembling the case and installing the keycaps.

The end result: my fully assembled Ergodox!
<img alt="Fully assembled ergodox" border="0" src="http://3.bp.blogspot.com/-tcgCeaelnJw/U18I0h8ckEI/AAAAAAAAAWQ/FlpcAKq-tdo/s1600/IMG_20140428_190406.jpg" height="480" title="Fully assembled ergodox" width="640">
