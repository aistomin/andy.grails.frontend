import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-imprint',
  imports: [CommonModule],
  template: `
    <div class="imprint-container">
      <div class="imprint-content">
        <h1>Imprint / Legal Notice</h1>
        <p class="last-updated">Last updated: January 2025</p>

        <section>
          <h2>1. Website Information</h2>
          <div class="info-block">
            <p><strong>Website:</strong> Andy Grails</p>
            <p><strong>URL:</strong> https://andy-grails.de</p>
            <p>
              <strong>Type:</strong> Video content and entertainment platform
            </p>
          </div>
        </section>

        <!-- <section>
          TODO: Issue #85. Fulfill the data and uncomment the section.
          <h2>2. Website Owner</h2>
          <div class="info-block">
            <p><strong>Name:</strong> Andy Grails</p>
            <p><strong>Email:</strong> contact@andygrails.com</p>
            <p><strong>Address:</strong> [Your Business Address]</p>
            <p><strong>Country:</strong> [Your Country]</p>
          </div>
        </section> -->

        <section>
          <h2>3. Content Responsibility</h2>
          <p>
            The content of this website has been carefully prepared and
            reviewed. However, we cannot guarantee the accuracy, completeness,
            or timeliness of the information provided. The use of this website
            and its content is at your own risk.
          </p>
          <p>
            We reserve the right to modify, update, or remove content at any
            time without prior notice.
          </p>
        </section>

        <section>
          <h2>4. External Links</h2>
          <p>
            This website may contain links to external websites operated by
            third parties. We have no control over the content, privacy
            policies, or practices of these external sites and are not
            responsible for their content or availability.
          </p>
          <p>
            The inclusion of external links does not imply endorsement or
            approval of the linked content.
          </p>
        </section>

        <section>
          <h2>5. Copyright and Intellectual Property</h2>
          <p>
            All content on this website, including but not limited to text,
            images, videos, graphics, logos, and software, is protected by
            copyright and other intellectual property laws.
          </p>
          <p>
            Unless otherwise stated, all rights are reserved by Andy Grails.
            Reproduction, distribution, or modification of content without
            explicit permission is prohibited.
          </p>
          <p>
            Third-party content (such as videos, images, or music) may be
            subject to their respective copyright holders' terms and conditions.
          </p>
        </section>

        <section>
          <h2>6. Terms of Use</h2>
          <h3>6.1 Acceptable Use</h3>
          <p>By using this website, you agree to:</p>
          <ul>
            <li>Use the website for lawful purposes only</li>
            <li>Respect intellectual property rights</li>
            <li>Not interfere with website functionality</li>
            <li>Not attempt to gain unauthorized access to our systems</li>
          </ul>

          <h3>6.2 User-Generated Content</h3>
          <p>
            If you submit comments, feedback, or other content to our website,
            you grant us a non-exclusive, royalty-free license to use,
            reproduce, and distribute such content.
          </p>
        </section>

        <section>
          <h2>7. Disclaimer of Warranties</h2>
          <p>
            This website is provided "as is" without any warranties, express or
            implied. We disclaim all warranties, including but not limited to:
          </p>
          <ul>
            <li>
              Warranties of merchantability and fitness for a particular purpose
            </li>
            <li>
              Warranties that the website will be uninterrupted or error-free
            </li>
            <li>Warranties regarding the accuracy or reliability of content</li>
          </ul>
        </section>

        <section>
          <h2>8. Limitation of Liability</h2>
          <p>
            In no event shall Andy Grails be liable for any direct, indirect,
            incidental, special, or consequential damages arising from the use
            of this website or its content, including but not limited to loss of
            profits, data, or business opportunities.
          </p>
        </section>

        <section>
          <h2>9. Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in
            accordance with the laws of [Your Jurisdiction]. Any disputes
            arising from the use of this website shall be subject to the
            exclusive jurisdiction of the courts in [Your Jurisdiction].
          </p>
        </section>

        <section>
          <h2>10. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms and conditions at any
            time. Changes will be effective immediately upon posting on this
            website. Continued use of the website constitutes acceptance of the
            modified terms.
          </p>
        </section>

        <!-- <section>
          TODO: Use the contact for or contact data from the Issue #84
          <h2>11. Contact Information</h2>
          <p>
            For questions regarding this imprint or legal matters, please
            contact us:
          </p>
          <div class="contact-info">
            <p><strong>Email:</strong> legal@andygrails.com</p>
            <p><strong>Address:</strong> [Your Business Address]</p>
            <p><strong>Phone:</strong> [Your Phone Number]</p>
          </div>
        </section> -->
      </div>
    </div>
  `,
  styleUrls: ['./imprint.component.scss'],
})
export class ImprintComponent {}
