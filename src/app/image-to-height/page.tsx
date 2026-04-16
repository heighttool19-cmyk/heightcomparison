import React from 'react';
import { Plus, Monitor, CheckCircle2, Camera, Smartphone, Info, Ruler } from 'lucide-react';
import { ImageMeasurement } from '@/components/ImageMeasurement';
import Link from 'next/link';
import FaqAccordion from '@/components/FaqAccordion';
import { IMAGE_TO_HEIGHT_FAQ } from '@/constants/imageToHeight';
import JsonLd from '@/components/common/JsonLd';
import { IMAGE_TO_HEIGHT_SCHEMA } from '@/constants/schemas/imageToHeight';

export default function ImageToHeightPage() {
    return (
        <div className="flex-1 bg-canvas p-2 py-8 md:p-8 transform-gpu">
            <JsonLd data={IMAGE_TO_HEIGHT_SCHEMA} />
            <div className="flex-1 flex flex-col justify-center items-center md:flex-row relative p-2 md:p-4 gap-4 bg-canvas overflow-x-clip w-full transform-gpu">

                {/* Right Panel (Tool & Content) - Shown first on mobile */}
                <div className="responsive-tool-container flex flex-col gap-6 pb-10">
                    <div className="flex-1 bg-surface border border-border rounded-3xl shadow-xl overflow-hidden relative">
                        <div className="p-4 md:p-8 flex flex-col relative w-full">
                            {/* Ghost Watermark */}
                            <div className="absolute top-1/2 right-4 md:right-10 -translate-y-1/2 text-[20vw] md:text-[15vw] font-black text-foreground opacity-5 pointer-events-none select-none tracking-tighter leading-none transform-gpu">
                                HEIGHT
                            </div>
                            <div className="relative z-10 w-full h-fit max-w-4xl mx-auto">
                                <ImageMeasurement />
                            </div>
                        </div>
                    </div>

                    {/* Comprehensive Content Section */}
                    <div className="flex  flex-col gap-12 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">

                        <div className="space-y-6">
                            <h1 className="text-2xl md:text-[40px] font-black text-foreground leading-[1.1] tracking-tighter uppercase px-3 py-4 bg-accent/5 rounded-2xl border-l-8 border-l-accent">
                                Measure Your Height From a Photo. <span className="text-accent">No Tape Measure Needed.</span>
                            </h1>
                            <p className="text-muted leading-relaxed text-base md:text-lg max-w-3xl mt-6 font-bold tracking-[0.01em] opacity-90 px-2">
                                Upload any photo with a door or known object in the frame. Set one reference point. Get your height in centimeters and feet and inches. Results land within 1 to 2 centimeters. Free, no sign-up, works on any device.
                            </p>
                            <div className="pt-2 flex flex-col items-start gap-4">
                                <Link
                                    href="#calculate-your-height-and-weight-percentile"
                                    className="bg-accent text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-[1.05] transition-all shadow-xl shadow-accent/20 flex items-center gap-2 active:scale-95"
                                >
                                    <Monitor size={16} /> Upload Your Photo and Measure Now
                                </Link>
                                <p className="text-[11px] text-muted font-black flex items-center gap-1.5 ml-2 uppercase tracking-wider">
                                    <CheckCircle2 size={12} className="text-accent" /> Accurate to 1–2 cm. Free. No account needed.
                                </p>
                            </div>

                            {/* Stacked Content Layout */}
                            <div className="mt-12 space-y-12 max-w-3xl">

                                {/* Problem Section */}
                                <div className="space-y-4">
                                    <h2 className="text-2xl font-black text-foreground uppercase tracking-tight">The Problem With Measuring Your Own Height</h2>
                                    <p className="text-muted leading-relaxed font-medium">
                                        Measuring your own height accurately is harder than it looks. Most people are off by half an inch to a full inch without realizing it.
                                    </p>
                                    <p className="text-muted leading-relaxed font-medium">
                                        The wall-and-book method fails in three specific ways. You are probably hunching slightly. The book is not perfectly level. The tape is not sitting flat on the floor. Each error is small. Together they push the reading off by more than you expect.
                                    </p>
                                    <div className="p-4 bg-accent/5 border-l-4 border-accent rounded-r-xl my-4">
                                        <p className="text-sm italic text-foreground/80 font-bold">
                                            There is one more thing most people miss. Your spine compresses under your body weight throughout the day. You stand up to one centimeter taller in the morning than at night. The time you measure actually changes the number.
                                        </p>
                                    </div>
                                    <div className="text-muted leading-relaxed font-medium">
                                        Doing it alone makes everything worse. Standing straight, balancing a hardback on your head, marking a wall, and measuring the mark, all at once, is physically awkward. Most guides assume a second person is helping. That defeats the point.
                                        <br /> There is a cleaner way.</div>
                                </div>

                                {/* Alternate Methods Section */}
                                <div className="space-y-4">
                                    <h2 className="text-2xl font-black text-foreground uppercase tracking-tight">How to Measure Your Height Without a Measuring Tape</h2>
                                    <p className="text-muted leading-relaxed font-medium">
                                        Three methods work reliably when no tape measure is available. Each uses a fixed reference dimension to establish scale.
                                    </p>

                                    <div className="space-y-6 mt-6">
                                        {[
                                            { title: "The doorframe method.", desc: "Standard US interior doors stand 80 inches (203 cm) tall. Stand in the frame, note where the top of your head falls, and you have a working estimate. Not precise to the half-inch, but accurate enough to know whether you are 5'8\" or 5'10\"." },
                                            { title: "The arm span method.", desc: "Your fingertip-to-fingertip wingspan with arms fully extended matches your height within about one inch. If you know your arm span, you know your height." },
                                            { title: "The dollar bill method.", desc: "A US dollar bill is 6.14 inches long. Mark your height on a wall, stack bills from the floor to the mark, count them, and multiply. Tedious, but mathematically sound." }
                                        ].map((item, i) => (
                                            <div key={i} className="flex gap-4 items-start">
                                                <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-accent text-xs font-black shrink-0 mt-0.5">{i + 1}</div>
                                                <div>
                                                    <h3 className="text-base font-black text-foreground uppercase tracking-wide">{item.title}</h3>
                                                    <p className="text-muted leading-relaxed mt-1 font-medium">{item.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-muted leading-relaxed pt-6 font-medium">
                                        All three get you close. None gets you exact. Confirming the precise number still needs a calibrated reference at some point, unless you use a photo.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 2. Photo Method Explained */}
                        <div className="bg-surface border-2 border-border/80 rounded-[2rem] p-6 md:p-12 relative overflow-hidden group shadow-xl mx-2 md:mx-0">
                            <div className="absolute -right-20 -top-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors duration-1000 transform-gpu" />
                            <div className="relative z-10 max-w-3xl">
                                <h2 className="text-xl md:text-3xl font-black text-foreground mb-4 uppercase tracking-tighter">How to Determine Your Height Without Measuring: Using a Photo</h2>
                                <p className="text-muted leading-relaxed text-base md:text-lg mb-4 font-bold opacity-70">
                                    Every photo contains fixed scale data as long as one object of known size appears in the frame. A standard door is 203 cm. A credit card is 85.6 mm wide. When either appears alongside a person, that person's height is calculable from the image alone.
                                </p>
                                <p className="text-muted leading-relaxed text-base md:text-lg mb-8 font-bold opacity-70">
                                    That is exactly how this tool works. Upload a photo, identify one object you know the size of, and the tool calculates the height of anyone in the frame. No tape measure. No wall marks. No second person.
                                </p>
                                <Link
                                    href="#calculate-your-height-and-weight-percentile"
                                    className="bg-accent text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-[1.05] transition-all shadow-xl shadow-accent/20 flex items-center gap-2 active:scale-95 inline-flex"
                                >
                                    Upload Now
                                </Link>
                            </div>
                        </div>

                        {/* 3. Step-by-Step Visualization */}
                        <div className="space-y-8 w-full px-2 md:px-0">
                            <h3 className="text-xl md:text-3xl font-black text-foreground tracking-tighter uppercase">
                                How the Image Height Tool Works: Step by Step
                            </h3>

                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {[
                                    { icon: <Camera size={20} />, title: "Upload your photo", body: "Use any photo that shows the full body, head to toe. Include at least one object of known size in the frame. A doorframe is the most reliable option." },
                                    { icon: <Ruler size={20} />, title: "Calibrate with a known object", body: "Select the reference object and enter its real size. A standard US interior door at 203 cm (80 inches) is the best choice. Its size is fixed and consistent across US construction. The more accurate your reference, the more accurate your result." },
                                    { icon: <Smartphone size={20} />, title: "Draw your measurement line", body: "Place a line from the floor beneath the subject's feet to the top of their head. Start from the floor, not the feet. That gap matters when footwear appears in the photo." },
                                    { icon: <CheckCircle2 size={20} />, title: "Read your result and save to chart", body: "Your height appears in both centimeters and feet and inches. Hit \"Save to Chart\" to log it and compare against friends, athletes, celebrities, or anyone else." }
                                ].map((step, idx) => (
                                    <div key={idx} className="bg-surface border border-border p-6 rounded-2xl hover:border-accent/40 transition-all hover:translate-y-[-4px] group flex flex-col shadow-sm">
                                        <div className="w-12 h-12 rounded-full bg-bg border border-border flex items-center justify-center text-muted group-hover:text-accent group-hover:bg-accent/5 transition-all mb-6">
                                            {step.icon}
                                        </div>
                                        <p className="text-[14px] font-black uppercase text-accent mb-2 tracking-widest">
                                            Step 0{idx + 1}
                                        </p>
                                        <h4 className="text-base font-black text-foreground mb-3 leading-snug uppercase tracking-tight">
                                            {step.title}
                                        </h4>
                                        <p className="text-[13px] text-muted leading-relaxed font-bold opacity-70 group-hover:opacity-100 transition-opacity">
                                            {step.body}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 4. Tips Section */}
                        <div className="space-y-8 px-2 md:px-0">
                            <h2 className="text-xl md:text-3xl font-black text-foreground flex items-center gap-3 uppercase tracking-tighter">
                                <Info className="text-accent" /> How to Measure Your Height Accurately: Tips for the Best Result
                            </h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {[
                                    { title: "Camera angle", desc: "Camera angle is the single biggest source of error in photo-based measurement. A phone aimed from below adds false height. From above it removes it. Set your camera at mid-chest height, pointed straight ahead." },
                                    { title: "Reference Placement", desc: "Keep your reference object close to the subject in the frame. Lens distortion increases toward the edges of a photo. A reference object on one side of the frame and a subject on the other introduces small but real scale errors." },
                                    { title: "Stand straight", desc: "Stand straight in the photo. Heels flat, back straight, head level. Posture errors in the photo produce the same measurement errors as posture errors against a wall." },
                                    { title: "Show the full body", desc: "Show the full body. Cropped feet or a cropped head makes a floor-to-crown measurement impossible. Head to toe in the frame gives the cleanest result." },
                                    { title: "Use a door", desc: "Use a door whenever possible. At 203 cm it is the most universally sized and most commonly photographed reference object in any indoor setting." }
                                ].map((tip, i) => (
                                    <div key={i} className="flex gap-4 items-start group">
                                        <div className="shrink-0 w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                                            <Plus size={16} />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-black text-foreground leading-tight uppercase tracking-wide group-hover:text-accent transition-colors">{tip.title}</h3>
                                            <p className="text-xs text-muted mt-1 leading-relaxed font-bold opacity-70 group-hover:opacity-100 transition-opacity">{tip.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div id="frequently-asked-questions" className="scroll-mt-24">
                            <FaqAccordion items={IMAGE_TO_HEIGHT_FAQ} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}