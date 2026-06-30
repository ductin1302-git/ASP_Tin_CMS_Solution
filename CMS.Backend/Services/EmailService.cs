using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace CMS.Backend.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<EmailService> _logger;

        public EmailService(IConfiguration configuration, ILogger<EmailService> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }

        public async Task SendEmailAsync(string toEmail, string subject, string htmlMessage)
        {
            try
            {
                var smtpServer = _configuration["EmailSettings:SmtpServer"] ?? "smtp.gmail.com";
                var smtpPort = int.Parse(_configuration["EmailSettings:SmtpPort"] ?? "587");
                var senderName = _configuration["EmailSettings:SenderName"] ?? "V-SPORT System";
                var senderEmail = _configuration["EmailSettings:SenderEmail"];
                var senderPassword = _configuration["EmailSettings:SenderPassword"];

                if (string.IsNullOrEmpty(senderEmail) || string.IsNullOrEmpty(senderPassword))
                {
                    _logger.LogWarning("EmailSettings is not configured properly in appsettings.json. Skipping email send.");
                    return;
                }

                var mailMessage = new MailMessage
                {
                    From = new MailAddress(senderEmail, senderName),
                    Subject = subject,
                    Body = htmlMessage,
                    IsBodyHtml = true
                };
                mailMessage.To.Add(toEmail);

                using var smtpClient = new SmtpClient(smtpServer, smtpPort)
                {
                    Credentials = new NetworkCredential(senderEmail, senderPassword),
                    EnableSsl = true,
                };

                await smtpClient.SendMailAsync(mailMessage);
                _logger.LogInformation($"Email sent successfully to {toEmail}");
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to send email to {toEmail}. Error: {ex.Message}");
            }
        }
    }
}
