using LearnAPI.Modal;
using LearnAPI.Service;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;

namespace LearnAPI.Container
{
    public class EmailService : IEmailService
    {
        private readonly EmailSettings emailSettings;
        public EmailService(IOptions<EmailSettings> options) {
          this.emailSettings = options.Value;
        }
        public async Task SendEmail(Mailrequest mailrequest)
        {
            var email = new MimeMessage();
            email.Sender = MailboxAddress.Parse(emailSettings.Email);
            email.To.Add(MailboxAddress.Parse(mailrequest.Email));
            email.Subject=mailrequest.Subject;
            var builder=new BodyBuilder();
            builder.HtmlBody = mailrequest.Emailbody;
            email.Body = builder.ToMessageBody();

            //using var smptp = new SmtpClient();
            //smptp.Connect(emailSettings.Host, emailSettings.Port,SecureSocketOptions.StartTls);
            //smptp.Authenticate(emailSettings.Email, emailSettings.Password);
            //await smptp.SendAsync(email);
            //smptp.Disconnect(true);
            try
            {
                using var smtp = new SmtpClient();
                smtp.Connect("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
                smtp.Authenticate(emailSettings.Email, emailSettings.Password); // Use App Password if 2FA is enabled
                await smtp.SendAsync(email);
                smtp.Disconnect(true);
            }
            catch (AuthenticationException authEx)
            {
                Console.WriteLine($"Authentication Error: {authEx.Message}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"General Error: {ex.Message}");
            }
        }
    }
}
