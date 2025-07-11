"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, ArrowLeft, Share2, FileText, User, Tag, TrendingUp, Star } from "lucide-react"
import Link from "next/link"

interface ArticleDetailProps {
  articleId: string
}

export function ArticleDetail({ articleId }: ArticleDetailProps) {
  // In a real app, you'd fetch this data based on articleId
  const article = {
    id: Number.parseInt(articleId),
    title: "Complete Guide to Spring Boot Security",
    excerpt:
      "An in-depth exploration of Spring Security implementation, from basic authentication to advanced authorization patterns.",
    content: `
# Complete Guide to Spring Boot Security

Spring Security is a powerful and highly customizable authentication and access-control framework. It is the de-facto standard for securing Spring-based applications. In this comprehensive guide, we'll explore everything you need to know about implementing security in your Spring Boot applications.

## Table of Contents

1. Introduction to Spring Security
2. Basic Authentication Setup
3. JWT Token Implementation
4. OAuth2 Integration
5. Method-Level Security
6. Security Best Practices

## Introduction to Spring Security

Spring Security provides comprehensive security services for Java EE-based enterprise software applications. It handles authentication, authorization, and protection against common attacks.

### Key Features

- **Authentication**: Verifying the identity of users
- **Authorization**: Determining what authenticated users can do
- **Protection**: Against common attacks like CSRF, session fixation, etc.

## Basic Authentication Setup

Let's start with a basic Spring Security configuration:

\`\`\`java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/api/public/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .httpBasic(withDefaults())
            .csrf(csrf -> csrf.disable());
        
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
\`\`\`

## JWT Token Implementation

JSON Web Tokens (JWT) are a popular way to handle authentication in modern applications:

\`\`\`java
@Component
public class JwtTokenProvider {
    
    private String jwtSecret = "mySecretKey";
    private int jwtExpirationInMs = 604800000;

    public String generateToken(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Date expiryDate = new Date(System.currentTimeMillis() + jwtExpirationInMs);

        return Jwts.builder()
                .setSubject(Long.toString(userPrincipal.getId()))
                .setIssuedAt(new Date())
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    public Long getUserIdFromJWT(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(jwtSecret)
                .parseClaimsJws(token)
                .getBody();

        return Long.parseLong(claims.getSubject());
    }

    public boolean validateToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            logger.error("Invalid JWT token: {}", e.getMessage());
        }
        return false;
    }
}
\`\`\`

## OAuth2 Integration

OAuth2 is an authorization framework that enables applications to obtain limited access to user accounts:

\`\`\`java
@Configuration
@EnableOAuth2Client
public class OAuth2Config {

    @Bean
    public OAuth2RestTemplate oauth2RestTemplate(OAuth2ClientContext oauth2ClientContext,
                                                OAuth2ProtectedResourceDetails details) {
        return new OAuth2RestTemplate(details, oauth2ClientContext);
    }

    @Bean
    public OAuth2ProtectedResourceDetails googleResource() {
        AuthorizationCodeResourceDetails details = new AuthorizationCodeResourceDetails();
        details.setId("google");
        details.setClientId("your-client-id");
        details.setClientSecret("your-client-secret");
        details.setAccessTokenUri("https://oauth2.googleapis.com/token");
        details.setUserAuthorizationUri("https://accounts.google.com/o/oauth2/auth");
        details.setScope(Arrays.asList("openid", "email", "profile"));
        return details;
    }
}
\`\`\`

## Method-Level Security

You can secure individual methods using annotations:

\`\`\`java
@Service
public class UserService {

    @PreAuthorize("hasRole('ADMIN')")
    public void deleteUser(Long userId) {
        // Only admins can delete users
        userRepository.deleteById(userId);
    }

    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public User getCurrentUser() {
        // Both users and admins can access this
        return getCurrentAuthenticatedUser();
    }

    @PostAuthorize("returnObject.username == authentication.name or hasRole('ADMIN')")
    public User getUserById(Long id) {
        // Users can only access their own data, admins can access any
        return userRepository.findById(id);
    }
}
\`\`\`

## Security Best Practices

### 1. Use HTTPS Everywhere

Always use HTTPS in production to protect data in transit:

\`\`\`yaml
server:
  ssl:
    enabled: true
    key-store: classpath:keystore.p12
    key-store-password: password
    key-store-type: PKCS12
\`\`\`

### 2. Implement Proper Session Management

\`\`\`java
@Configuration
public class SessionConfig {

    @Bean
    public HttpSessionEventPublisher httpSessionEventPublisher() {
        return new HttpSessionEventPublisher();
    }

    @Bean
    public SessionRegistry sessionRegistry() {
        return new SessionRegistryImpl();
    }
}
\`\`\`

### 3. Enable CSRF Protection

\`\`\`java
http.csrf(csrf -> csrf
    .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
    .ignoringRequestMatchers("/api/public/**")
);
\`\`\`

### 4. Implement Rate Limiting

\`\`\`java
@Component
public class RateLimitingFilter implements Filter {

    private final RateLimiter rateLimiter = RateLimiter.create(10.0); // 10 requests per second

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, 
                        FilterChain chain) throws IOException, ServletException {
        
        if (rateLimiter.tryAcquire()) {
            chain.doFilter(request, response);
        } else {
            HttpServletResponse httpResponse = (HttpServletResponse) response;
            httpResponse.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
            httpResponse.getWriter().write("Rate limit exceeded");
        }
    }
}
\`\`\`

## Testing Security

Always test your security configuration:

\`\`\`java
@SpringBootTest
@AutoConfigureTestDatabase
class SecurityConfigTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void shouldAllowAccessToPublicEndpoints() {
        ResponseEntity<String> response = restTemplate.getForEntity("/api/public/health", String.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    void shouldRequireAuthenticationForProtectedEndpoints() {
        ResponseEntity<String> response = restTemplate.getForEntity("/api/users", String.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
    }
}
\`\`\`

## Conclusion

Spring Security provides a robust foundation for securing your applications. By following these patterns and best practices, you can build secure, maintainable applications that protect your users' data and maintain their trust.

Remember to:
- Always use HTTPS in production
- Implement proper authentication and authorization
- Protect against common vulnerabilities
- Test your security configuration thoroughly
- Keep your dependencies up to date

Security is not a one-time implementation but an ongoing process that requires constant attention and updates.
    `,
    image: "/placeholder.svg?height=400&width=800",
    category: "Security",
    tags: ["Spring Security", "JWT", "OAuth2", "Authentication", "Authorization"],
    publishedAt: "2024-01-20",
    readTime: "25 min read",
    difficulty: "Advanced",
    views: 15420,
    author: {
      name: "Asadbek Abdinazarov",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "Java Backend Developer & Security Expert",
    },
    featured: true,
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-500"
      case "Intermediate":
        return "bg-yellow-500"
      case "Advanced":
        return "bg-red-500"
      default:
        return "bg-blue-500"
    }
  }

  const relatedArticles = [
    {
      id: 2,
      title: "Mastering JPA and Hibernate Performance",
      excerpt: "Deep dive into JPA and Hibernate optimization techniques.",
      image: "/placeholder.svg?height=150&width=200",
      readTime: "20 min read",
      difficulty: "Intermediate",
    },
    {
      id: 3,
      title: "Event-Driven Architecture with Apache Kafka",
      excerpt: "Building resilient, scalable systems using event-driven architecture.",
      image: "/placeholder.svg?height=150&width=200",
      readTime: "18 min read",
      difficulty: "Advanced",
    },
  ]

  return (
    <div className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="neomorphic hover:scale-105 transition-transform">
            <Link href="/articles">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Articles
            </Link>
          </Button>
        </div>

        {/* Article Header */}
        <article className="space-y-8">
          <header className="text-center space-y-6">
            <div className="space-y-4">
              <div className="flex justify-center gap-2">
                {article.featured && (
                  <Badge className="gradient-primary text-white flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Featured
                  </Badge>
                )}
                <Badge variant="outline" className="claymorphic">
                  {article.category}
                </Badge>
                <Badge className={`${getDifficultyColor(article.difficulty)} text-white`}>{article.difficulty}</Badge>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-slate-800 leading-tight">{article.title}</h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">{article.excerpt}</p>
            </div>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{article.author.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(article.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{article.readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span>{article.views.toLocaleString()} views</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap justify-center gap-2">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="claymorphic">
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Share Button */}
            <Button variant="outline" className="neomorphic bg-transparent">
              <Share2 className="w-4 h-4 mr-2" />
              Share Article
            </Button>
          </header>

          {/* Featured Image */}
          <div className="relative">
            <img
              src={article.image || "/placeholder.svg"}
              alt={article.title}
              className="w-full h-64 md:h-96 object-cover rounded-2xl"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div className="modal-glassmorphic p-8 rounded-2xl">
              <div
                className="text-slate-700 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: article.content
                    .replace(/\n/g, "<br />")
                    .replace(
                      /```(\w+)?\n([\s\S]*?)```/g,
                      '<pre class="bg-slate-100 p-4 rounded-lg overflow-x-auto my-4"><code class="text-sm">$2</code></pre>',
                    )
                    .replace(/`([^`]+)`/g, '<code class="bg-slate-100 px-2 py-1 rounded text-sm">$1</code>')
                    .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold text-slate-800 mt-8 mb-4">$1</h3>')
                    .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold text-slate-800 mt-10 mb-6">$1</h2>')
                    .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold text-slate-800 mt-12 mb-8">$1</h1>'),
                }}
              />
            </div>
          </div>

          {/* Author Bio */}
          <Card className="neomorphic border-0">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <img
                  src={article.author.avatar || "/placeholder.svg"}
                  alt={article.author.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">{article.author.name}</h3>
                  <p className="text-slate-600">{article.author.bio}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </article>

        {/* Related Articles */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">
            Related Articles
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {relatedArticles.map((relatedArticle) => (
              <Card
                key={relatedArticle.id}
                className="neomorphic border-0 hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <div className="flex gap-4 p-4">
                  <img
                    src={relatedArticle.image || "/placeholder.svg"}
                    alt={relatedArticle.title}
                    className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800 mb-2 line-clamp-2">{relatedArticle.title}</h3>
                    <p className="text-sm text-slate-600 mb-2 line-clamp-2">{relatedArticle.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {relatedArticle.readTime}
                      </div>
                      <Badge className={`${getDifficultyColor(relatedArticle.difficulty)} text-white text-xs`}>
                        {relatedArticle.difficulty}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <Button variant="ghost" size="sm" asChild className="w-full">
                    <Link href={`/articles/${relatedArticle.id}`}>
                      <FileText className="w-4 h-4 mr-2" />
                      Read More
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
