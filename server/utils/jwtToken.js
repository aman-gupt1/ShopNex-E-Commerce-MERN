// export const sendToken = (user, statusCode, res) => {
//   try {
//     // Generate JWT
//     const token = user.getJWTToken();

//     // Cookie expiration (default 7 days if not provided)
//     const cookieExpireDays = Number(process.env.EXPIRE_COOKIE) || 7;

//     // Cookie options (different for dev & prod)
//     const options = {
//       expires: new Date(Date.now() + cookieExpireDays * 24 * 60 * 60 * 1000),
//       httpOnly: true, // client JS cannot access cookie
//       secure: process.env.NODE_ENV === "production", // only HTTPS in prod
//       sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // ✅ fix for cross-domain
//     };

//     // Send cookie + response
//     res
//       .status(statusCode)
//       .cookie("token", token, options)
//       .json({
//         success: true,
//         token,
//         user,
//       });
//   } catch (error) {
//     console.error("Error in sendToken:", error.message);
//     res.status(500).json({
//       success: false,
//       message: "Something went wrong while generating token",
//     });
//   }
// };




export const sendToken = (user, statusCode, res) => {
  try {
    // Generate JWT with extra claims
    const token = user.getJWTToken();

    // Cookie expiration (default: 7 days if not provided in .env)
    const cookieExpireDays = Number(process.env.EXPIRE_COOKIE) || 7;

    // Cookie options
    const options = {
      expires: new Date(Date.now() + cookieExpireDays * 24 * 60 * 60 * 1000),
      httpOnly: true, // Prevent XSS (client-side JS cannot access cookie)
      secure: process.env.NODE_ENV === "production", // HTTPS only in prod
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // Cross-domain auth support
    };

    // Response (exclude sensitive data like password)
    res
      .status(statusCode)
      .cookie("token", token, options)
      .json({
        success: true,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
        },
      });
  } catch (error) {
    console.error("Error in sendToken:", error.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong while generating token",
    });
  }
};

