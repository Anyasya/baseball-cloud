import React from 'react';
import styled from 'styled-components';
import './style.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function TermsPage() {
  return (
    <Container>
      <Header type='sign'/>
      <Main className='main'>
        <Wrapper>
          <h2>Terms and Conditions</h2>
          <Date>Last updated May 09, 2018</Date>
          <p>Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the 
            <a href="http://www.baseballcloud.com"> http://www.baseballcloud.com </a>
            website (the "Service") operated by DaTraks LLC ("us", "we", or "our").
          </p>
          <p>Your access to and use of the Service is conditioned upon your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who wish to access or use the Service.</p>
          <p>By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you do not have permission to access the Service.</p>
          <h3>Communications</h3>
          <p>By creating an Account on our service, you agree to subscribe to newsletters, marketing or promotional materials and other information we may send. However, you may opt out of receiving any, or all, of these communications from us by following the unsubscribe link or instructions provided in any email we send.</p>
          <h3>Purchases</h3>
          <p>If you wish to purchase any product or service made available through the Service ("Purchase"), you may be asked to supply certain information relevant to your Purchase including, without limitation, your credit card number, the expiration date of your credit card, your billing address, and your shipping information.</p>
          <p>You represent and warrant that: (i) you have the legal right to use any credit card(s) or other payment method(s) in connection with any Purchase; and that (ii) the information you supply to us is true, correct and complete.</p>
          <p>The service may employ the use of third party services for the purpose of facilitating payment and the completion of Purchases. By submitting your information, you grant us the right to provide the information to these third parties subject to our Privacy Policy.</p>
          <p>We reserve the right to refuse or cancel your order at any time for reasons including but not limited to: product or service availability, errors in the description or price of the product or service, error in your order or other reasons.</p>
          <p>We reserve the right to refuse or cancel your order if fraud or an unauthorized or illegal transaction is suspected.</p>
          <h3>Availability, Errors and Inaccuracies</h3>
          <p>We are constantly updating product and service offerings on the Service. We may experience delays in updating information on the Service and in our advertising on other web sites. The information found on the Service may contain errors or inaccuracies and may not be complete or current. Products or services may be mispriced, described inaccurately, or unavailable on the Service and we cannot guarantee the accuracy or completeness of any information found on the Service.</p>
          <p>We therefore reserve the right to change or update information and to correct errors, inaccuracies, or omissions at any time without prior notice.</p>
          <h3>Contests, Sweepstakes and Promotions</h3>
          <p>Any contests, sweepstakes or other promotions (collectively, "Promotions") made available through the Service may be governed by rules that are separate from these Terms Conditions. If you participate in any Promotions, please review the applicable rules as well as our Privacy Policy. If the rules for a Promotion conflict with these Terms and Conditions, the Promotion rules will apply.</p>
          <h3>Subscriptions</h3>
          <p>Some parts of the Service are billed on a subscription basis ("Subscription(s)"). You will be billed in advance on a recurring and periodic basis ("Billing Cycle"). Billing cycles are set either on a monthly or annual basis, depending on the type of subscription plan you select when purchasing a Subscription.</p>
          <p>At the end of each Billing Cycle, your Subscription will automatically renew under the exact same conditions unless you cancel it or DaTraks LLC cancels it. You may cancel your Subscription renewal either through your online account management page or by contacting DaTraks LLC customer support team.</p>
          <p>A valid payment method, including credit card or PayPal, is required to process the payment for your Subscription. You shall provide DaTraks LLC with accurate and complete billing information including full name, address, state, zip code, telephone number, and a valid payment method information. By submitting such payment information, you automatically authorize DaTraks LLC to charge all Subscription fees incurred through your account to any such payment instruments.</p>
          <p>Should automatic billing fail to occur for any reason, DaTraks LLC will issue an electronic invoice indicating that you must proceed manually, within a certain deadline date, with the full payment corresponding to the billing period as indicated on the invoice.</p>
          <h3>Free Trial</h3>
          <p>DaTraks LLC may, at its sole discretion, offer a Subscription with a free trial for a limited period of time ("Free Trial").</p>
          <p>You may be required to enter your billing information in order to sign up for the Free Trial.</p>
          <p>If you do enter your billing information when signing up for the Free Trial, you will not be charged by DaTraks LLC until the Free Trial has expired. On the last day of the Free Trial period, unless you cancelled your Subscription, you will be automatically charged the applicable Subscription fees for the type of Subscription you have selected.</p>
          <p>At any time and without notice, DaTraks LLC reserves the right to (i) modify the terms and conditions of the Free Trial offer, or (ii) cancel such Free Trial offer.</p>
          <h3>Fee Changes</h3>
          <p>DaTraks LLC, in its sole discretion and at any time, may modify the Subscription fees for the Subscriptions. Any Subscription fee change will become effective at the end of the then-current Billing Cycle.</p>
          <p>DaTraks LLC will provide you with a reasonable prior notice of any change in Subscription fees to give you an opportunity to terminate your Subscription before such change becomes effective.</p>
          <p>Your continued use of the Service after the Subscription fee change comes into effect constitutes your agreement to pay the modified Subscription fee amount.</p>
          <h3>Refunds</h3>
          <p>Certain refund requests for Subscriptions may be considered by DaTraks LLC on a case-by-case basis and granted in sole discretion of DaTraks LLC.</p>
          <h3>Content</h3>
          <p>Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post on or through the Service, including its legality, reliability, and appropriateness.</p>
          <p>By posting Content on or through the Service, You represent and warrant that: (i) the Content is yours (you own it) and/or you have the right to use it and the right to grant us the rights and license as provided in these Terms, and (ii) that the posting of your Content on or through the Service does not violate the privacy rights, publicity rights, copyrights, contract rights or any other rights of any person or entity. We reserve the right to terminate the account of anyone found to be infringing on a copyright.</p>
          <p>You retain any and all of your rights to any Content you submit, post or display on or through the Service and you are responsible for protecting those rights. We take no responsibility and assume no liability for Content you or any third party posts on or through the Service. However, by posting Content using the Service you grant us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such Content on and through the Service. You agree that this license includes the right for us to make your Content available to other users of the Service, who may also use your Content subject to these Terms.</p>
          <p>DaTraks LLC has the right but not the obligation to monitor and edit all Content provided by users.</p>
          <p>In addition, Content found on or through this Service are the property of DaTraks LLC or used with permission. You may not distribute, modify, transmit, reuse, download, repost, copy, or use said Content, whether in whole or in part, for commercial purposes or for personal gain, without express advance written permission from us.</p>
          <h3>Accounts</h3>
          <p>When you create an account with us, you guarantee that you are above the age of 18, and that the information you provide us is accurate, complete, and current at all times. Inaccurate, incomplete, or obsolete information may result in the immediate termination of your account on the Service.</p>
          <p>You are responsible for maintaining the confidentiality of your account and password, including but not limited to the restriction of access to your computer and/or account. You agree to accept responsibility for any and all activities or actions that occur under your account and/or password, whether your password is with our Service or a third-party service. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</p>
          <p>You may not use as a username the name of another person or entity or that is not lawfully available for use, a name or trademark that is subject to any rights of another person or entity other than you, without appropriate authorization. You may not use as a username any name that is offensive, vulgar or obscene.</p>
          <p>We reserve the right to refuse service, terminate accounts, remove or edit content, or cancel orders in our sole discretion.</p>
          <h3>Copyright Policy</h3>
          <p>We respect the intellectual property rights of others. It is our policy to respond to any claim that Content posted on the Service infringes on the copyright or other intellectual property rights ("Infringement") of any person or entity.</p>
          <p>If you are a copyright owner, or authorized on behalf of one, and you believe that the copyrighted work has been copied in a way that constitutes copyright infringement, please submit your claim via email to support@baseballcloud.com, with the subject line: "Copyright Infringement" and include in your claim a detailed description of the alleged Infringement as detailed below, under "DMCA Notice and Procedure for Copyright Infringement Claims"</p>
          <p>You may be held accountable for damages (including costs and attorneys' fees) for misrepresentation or bad-faith claims on the infringement of any Content found on and/or through the Service on your copyright.</p>
          <h3>DMCA Notice and Procedure for Copyright Infringement Claims</h3>
          <p>You may submit a notification pursuant to the Digital Millennium Copyright Act (DMCA) by providing our Copyright Agent with the following information in writing (see 17 U.S.C 512(c)(3) for further detail):</p>
          <Sub>
            an electronic or physical signature of the person authorized to act on behalf of the owner of the copyright's interest;<br/>
            a description of the copyrighted work that you claim has been infringed, including the URL (i.e., web page address) of the location where the copyrighted work exists or a copy of the copyrighted work;<br/>
            identification of the URL or other specific location on the Service where the material that you claim is infringing is located;<br/>
            your address, telephone number, and email address;<br/>
            a statement by you that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law;<br/>
            a statement by you, made under penalty of perjury, that the above information in your notice is accurate and that you are the copyright owner or authorized to act on the copyright owner's behalf.
          </Sub>
          <p>You can contact our Copyright Agent via email at support@baseballcloud.com</p>
          <h3>Intellectual Property</h3>
          <p>The Service and its original content (excluding Content provided by users), features and functionality are and will remain the exclusive property of DaTraks LLC and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of DaTraks LLC.</p>
          <h3>Links To Other Web Sites</h3>
          <p>Our Service may contain links to third party web sites or services that are not owned or controlled by DaTraks LLC</p>
          <p>DaTraks LLC has no control over, and assumes no responsibility for the content, privacy policies, or practices of any third party web sites or services. We do not warrant the offerings of any of these entities/individuals or their websites.</p>
          <p>You acknowledge and agree that DaTraks LLC shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such third party web sites or services.</p>
          <p>We strongly advise you to read the terms and conditions and privacy policies of any third party web sites or services that you visit.</p>
          <h3>Termination</h3>
          <p>We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.</p>
          <p>If you wish to terminate your account, you may simply discontinue using the Service.</p>
          <p>All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.</p>
          <h3>Indemnification</h3>
          <p>You agree to defend, indemnify and hold harmless DaTraks LLC and its licensee and licensors, and their employees, contractors, agents, officers and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees), resulting from or arising out of a) your use and access of the Service, by you or any person using your account and password; b) a breach of these Terms, or c) Content posted on the Service.</p>
          <h3>Limitation Of Liability</h3>
          <p>In no event shall DaTraks LLC, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.</p>
          <h3>Disclaimer</h3>
          <p>Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.</p>
          <p>DaTraks LLC its subsidiaries, affiliates, and its licensors do not warrant that a) the Service will function uninterrupted, secure or available at any particular time or location; b) any errors or defects will be corrected; c) the Service is free of viruses or other harmful components; or d) the results of using the Service will meet your requirements.</p>
          <h3>Exclusions</h3>
          <p>Some jurisdictions do not allow the exclusion of certain warranties or the exclusion or limitation of liability for consequential or incidental damages, so the limitations above may not apply to you.</p>
          <h3>Governing Law</h3>
          <p>These Terms shall be governed and construed in accordance with the laws of Florida, United States, without regard to its conflict of law provisions.</p>
          <p>Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements we might have had between us regarding the Service.</p>
          <h3>Changes</h3>
          <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
          <p>By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Service.</p>
          <h3>Contact Us</h3>
          <p>If you have any questions about these Terms, please contact us.</p>
        </Wrapper>
      </Main>
      <Footer />
    </Container>
  );
}

export default TermsPage;

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Main = styled.main`
  padding: 15px;
  width: 100%;
  overflow-y: scroll;
`

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 30px 40px;
  max-width: 1200px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  background: hsla(0,0%,100%,.85);
  border-radius: 8px;
  box-shadow: 0 0 20px rgb(0 0 0 / 40%);

  a {
    color: #337ab7;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  h2 {
    margin: 12px 0;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 30px;
  }

  h3 {
    margin-top: 20px;
    margin-bottom: 10px;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 24px;
  }

  p {
    font-size: 16px;
    margin-bottom: 12px;
  }
`

const Date = styled.p`
  margin-bottom: 24px !important;
`

const Sub = styled.p`
  padding-left: 24px;
`