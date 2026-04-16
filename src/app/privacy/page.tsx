import React from 'react';
import { Shield, Lock, FileText, Eye, Database, HelpCircle, Clock, Mail } from 'lucide-react';

export default function PrivacyPage() {
    return (
        <div className="flex-1 bg-canvas py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-accent/10 text-accent mb-6">
                        <Shield size={32} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight uppercase mb-4">
                        Privacy <span className="text-accent">Policy</span>
                    </h1>
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-24 h-1.5 bg-accent rounded-full" />
                        <p className="text-muted text-sm font-medium mt-2">
                            Helping you understand how we protect your information.
                        </p>
                    </div>
                </div>

                {/* Main Content Card */}
                <div className="bg-surface border border-border rounded-[2.5rem] shadow-2xl overflow-hidden mb-12">
                    <div className="p-8 md:p-12 space-y-12">
                        {/* Intro */}
                        <div className="prose prose-lg max-w-none">
                            <p className="text-lg text-foreground font-semibold leading-relaxed">
                                This Privacy Policy explains what information Height Comparison Calculator collects, how it is used, and what choices you have. HeightComparison is a free height comparison tool available at heightcomparisoncalculator.com. No personal data is sold or shared with third parties for commercial purposes.
                            </p>
                        </div>

                        {/* What We Collect */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-3">
                                <Database className="text-accent" size={24} />
                                <h2 className="text-2xl font-black text-foreground uppercase tracking-tight">What We Collect</h2>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-accent" />
                                        Information You Provide
                                    </h3>
                                    <div className="pl-4 space-y-4 text-muted leading-relaxed font-medium">
                                        <p>
                                            When you use certain features of the tool, some data is temporarily stored on our servers:
                                        </p>
                                        <ul className="list-disc pl-5 space-y-3">
                                            <li>
                                                <span className="text-foreground font-bold">Uploaded images.</span> If you use the Image to Height feature, the photo you upload is sent to our servers to process height estimation. The image is not permanently stored. It is retained for up to 7 days and then deleted automatically.
                                            </li>
                                            <li>
                                                <span className="text-foreground font-bold">Shareable chart links and chart state.</span> When you generate a shareable link for your height comparison chart, the chart configuration (the heights, names, and subjects you added) is stored on our servers so that the link can be resolved when someone opens it. This data is retained for up to 7 days and then deleted automatically. No account is required to generate a link, and the data stored is not tied to any personally identifiable information.
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-accent" />
                                        Information Collected Automatically
                                    </h3>
                                    <div className="pl-4 space-y-4 text-muted leading-relaxed font-medium">
                                        <ul className="list-disc pl-5 space-y-3">
                                            <li>
                                                <span className="text-foreground font-bold">Google Analytics.</span> We use Google Analytics to understand how visitors use the site. This service collects standard usage data including pages visited, time on site, general geographic region (country or city level), browser type, and device type. Google Analytics uses cookies on its end to function. HeightComparison itself does not set any first-party cookies.
                                            </li>
                                        </ul>
                                        <p className="text-sm italic pl-5">
                                            For more information on how Google handles this data, see the Google Privacy Policy and Google Analytics Terms of Service.
                                        </p>
                                        <ul className="list-disc pl-5 space-y-3">
                                            <li>
                                                <span className="text-foreground font-bold">Server logs.</span> Like most web servers, ours may automatically record standard log data including IP addresses, referring URLs, and timestamps when you make requests to the site. This information is used for security and operational purposes only.
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* What We Do Not Collect */}
                        <div className="pt-8 border-t border-border/50">
                            <div className="flex items-center gap-3 mb-6">
                                <Eye className="text-accent" size={24} />
                                <h2 className="text-2xl font-black text-foreground uppercase tracking-tight">What We Do Not Collect</h2>
                            </div>
                            <div className="space-y-4 text-muted leading-relaxed font-medium">
                                <p>To be clear about what this site does not do:</p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>We do not collect your name, email address, or any account information. There are no accounts.</li>
                                    <li>We do not collect payment information. The tool is free.</li>
                                    <li>We do not track heights you enter into the comparison tool. Input data is processed in your browser and is not sent to or stored on our servers (except in the specific cases described above).</li>
                                    <li>We are not affiliated with any advertising network. No data is shared with ad networks, and no behavioral advertising takes place on this site.</li>
                                </ul>
                            </div>
                        </div>

                        {/* How We Use the Data */}
                        <div className="pt-8 border-t border-border/50">
                            <div className="flex items-center gap-3 mb-6">
                                <Zap className="text-accent" size={20} />
                                <h2 className="text-2xl font-black text-foreground uppercase tracking-tight text-accent inline-flex items-center gap-2">
                                    <Zap size={24} className="fill-accent" />
                                    How We Use the Data
                                </h2>
                            </div>
                            <div className="space-y-4 text-muted leading-relaxed font-medium text-lg">
                                <p>The data described above is used for the following purposes only:</p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Processing and returning image-based height estimates to you</li>
                                    <li>Generating and resolving shareable chart links</li>
                                    <li>Understanding general usage patterns through Google Analytics so we can improve the tool</li>
                                    <li>Maintaining server security and diagnosing technical issues</li>
                                </ul>
                                <p>We do not use any collected data to build user profiles, serve targeted ads, or share with third parties beyond Google Analytics as described.</p>
                            </div>
                        </div>

                        {/* Data Retention */}
                        <div className="pt-8 border-t border-border/50">
                            <div className="flex items-center gap-3 mb-6">
                                <Clock className="text-accent" size={24} />
                                <h2 className="text-2xl font-black text-foreground uppercase tracking-tight">Data Retention</h2>
                            </div>
                            <p className="text-muted leading-relaxed font-medium text-lg">
                                Uploaded images and shareable chart link data are deleted from our servers within 7 days of creation. Server log data is retained for standard operational periods consistent with security and debugging needs.
                            </p>
                        </div>

                        {/* Your Rights and Choices */}
                        <div className="pt-8 border-t border-border/50">
                            <div className="flex items-center gap-3 mb-6">
                                <HelpCircle className="text-accent" size={24} />
                                <h2 className="text-2xl font-black text-foreground uppercase tracking-tight">Your Rights and Choices</h2>
                            </div>
                            <div className="space-y-4 text-muted leading-relaxed font-medium">
                                <p>
                                    <span className="text-foreground font-bold">Requesting data deletion.</span> If you have used a shareable link or uploaded an image and would like the associated data removed before the automatic 7-day deletion, you can contact us at <a href="mailto:contact@heightcomparisoncalculator.com" className="text-accent hover:underline">contact@heightcomparisoncalculator.com</a> and we will delete it promptly.
                                </p>
                                <p>
                                    <span className="text-foreground font-bold">Opting out of Google Analytics.</span> You can prevent Google Analytics from collecting data about your visit by installing the Google Analytics Opt-out Browser Add-on.
                                </p>
                                <p>
                                    <span className="text-foreground font-bold">Browser controls.</span> Since HeightComparison does not set first-party cookies, there is nothing to manage from a cookie preferences standpoint on our end. Any cookies present in your browser from this site originate from Google Analytics.
                                </p>
                            </div>
                        </div>

                        {/* Children's Privacy */}
                        <div className="pt-8 border-t border-border/50">
                            <div className="flex items-center gap-3 mb-6">
                                <Lock className="text-accent" size={24} />
                                <h2 className="text-2xl font-black text-foreground uppercase tracking-tight">Children's Privacy</h2>
                            </div>
                            <p className="text-muted leading-relaxed font-medium text-lg">
                                HeightComparison is not directed at children under the age of 13. We do not knowingly collect any personal information from children. If you believe a child has submitted personal information through this site, please contact us at <a href="mailto:contact@heightcomparisoncalculator.com" className="text-accent hover:underline">contact@heightcomparisoncalculator.com</a> and we will remove it.
                            </p>
                        </div>

                        {/* Third-Party Links */}
                        <div className="pt-8 border-t border-border/50">
                            <div className="flex items-center gap-3 mb-6">
                                <FileText className="text-accent" size={24} />
                                <h2 className="text-2xl font-black text-foreground uppercase tracking-tight">Third-Party Links</h2>
                            </div>
                            <p className="text-muted leading-relaxed font-medium text-lg">
                                The site may contain links to external websites. This Privacy Policy applies only to HeightComparison. We are not responsible for the privacy practices of any third-party sites.
                            </p>
                        </div>

                        {/* Changes to This Policy */}
                        <div className="pt-8 border-t border-border/50">
                            <div className="flex items-center gap-3 mb-6">
                                <Lock className="text-accent" size={24} />
                                <h2 className="text-2xl font-black text-foreground uppercase tracking-tight">Changes to This Policy</h2>
                            </div>
                            <p className="text-muted leading-relaxed font-medium text-lg">
                                If we make material changes to this policy, we will update the "Last updated" date at the top of this page. Continued use of the site after any changes constitutes acceptance of the updated policy.
                            </p>
                        </div>

                        {/* Contact */}
                        <div className="pt-8 border-t border-border/50">
                            <div className="flex items-center gap-3 mb-6">
                                <Mail className="text-accent" size={24} />
                                <h2 className="text-2xl font-black text-foreground uppercase tracking-tight">Contact</h2>
                            </div>
                            <p className="text-muted leading-relaxed font-medium text-lg">
                                If you have questions about this Privacy Policy or want to request data deletion, reach out at:
                                <br />
                                <span className="text-foreground font-bold">Email: </span>
                                <a href="mailto:contact@heightcomparisoncalculator.com" className="text-accent hover:underline">contact@heightcomparisoncalculator.com</a>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="text-center pb-12">
                    <p className="text-muted font-medium mb-6 italic opacity-70">
                        Your trust is important to us.
                    </p>
                </div>
            </div>
        </div>
    );
}

// Re-using same icons from Lucide for consistency
const Zap = ({ size, className }: { size?: number, className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size || 24}
        height={size || 24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
);
