import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-privacy',
  imports: [CommonModule],
  template: `
    <div class="privacy-container">
      <div class="privacy-content">
        <h1>Privacy Policy</h1>
        <p class="last-updated">Last updated: January 2025</p>

        <section>
          <h2>1. Introduction</h2>
          <p>
            Welcome to Andy Grails website. We respect your privacy and are
            committed to protecting your personal data. This privacy policy
            explains how we collect, use, and safeguard your information when
            you visit our website.
          </p>
        </section>

        <section>
          <h2>2. Information We Collect</h2>
          <h3>2.1 Information You Provide</h3>
          <p>
            We may collect information that you voluntarily provide to us, such
            as:
          </p>
          <ul>
            <li>Contact information (name, email address)</li>
            <li>Comments or feedback you submit</li>
            <li>Information you provide when contacting us</li>
          </ul>

          <h3>2.2 Automatically Collected Information</h3>
          <p>When you visit our website, we may automatically collect:</p>
          <ul>
            <li>IP address and location data</li>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Pages visited and time spent on pages</li>
            <li>Referring website information</li>
          </ul>
        </section>

        <section>
          <h2>3. How We Use Your Information</h2>
          <p>We use the collected information for the following purposes:</p>
          <ul>
            <li>To provide and maintain our website</li>
            <li>To improve user experience</li>
            <li>To respond to your inquiries and provide customer support</li>
            <li>To analyze website usage and trends</li>
            <li>To ensure website security and prevent fraud</li>
          </ul>
        </section>

        <section>
          <h2>4. Cookies and Tracking Technologies</h2>
          <p>
            We may use cookies and similar tracking technologies to enhance your
            browsing experience. You can control cookie settings through your
            browser preferences.
          </p>
        </section>

        <section>
          <h2>5. Third-Party Services</h2>
          <p>
            Our website may contain links to third-party websites and services.
            We are not responsible for the privacy practices of these external
            sites. We encourage you to review their privacy policies.
          </p>
        </section>

        <section>
          <h2>6. Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal
            information against unauthorized access, alteration, disclosure, or
            destruction.
          </p>
        </section>

        <section>
          <h2>7. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to processing of your data</li>
            <li>Withdraw consent where applicable</li>
          </ul>
        </section>

        <section>
          <h2>8. Children's Privacy</h2>
          <p>
            Our website is not intended for children under 13 years of age. We
            do not knowingly collect personal information from children under
            13.
          </p>
        </section>

        <section>
          <h2>9. Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. We will notify
            you of any changes by posting the new policy on this page and
            updating the "Last updated" date.
          </p>
        </section>

        <!-- <section>
          TODO: Use the contact for or contact data from the Issue #84
          <h2>10. Contact Us</h2>
          <p>
            If you have any questions about this privacy policy or our data
            practices, please contact us at:
          </p>
          <div class="contact-info">
            <p><strong>Email:</strong> privacy@andygrails.com</p>
            <p><strong>Address:</strong> [Your Business Address]</p>
          </div>
        </section> -->
      </div>
    </div>
  `,
  styleUrls: ['./privacy.component.scss'],
})
export class PrivacyComponent {}
